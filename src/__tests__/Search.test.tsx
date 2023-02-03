import {
  act,
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import SearchPage from "../pages/SearchPage";
import {
  generateSearchQuery,
  MAX_ISSUE_SEARCH_RESULTS,
  SEARCH_ISSUES_BY_TERM,
} from "../apollo/useIssueSearch";
import { IssueSearchQuery, IssueState } from "../__generated__/graphql";
import { BrowserRouter } from "react-router-dom";

const mocks: MockedResponse[] = [
  {
    request: {
      query: SEARCH_ISSUES_BY_TERM,
      variables: {
        searchQuery: generateSearchQuery("test-searchTerm1"),
        last: MAX_ISSUE_SEARCH_RESULTS,
      },
    },
    result: {
      data: {
        search: {
          issueCount: 3,
          edges: [
            {
              cursor: "abc",
              node: {
                title: "Sample Issue 1",
                createdAt: "2021-10-03T00:00:00Z",
                number: 1,
                state: IssueState.Open,
                author: null,
                __typename: "Issue",
              },
              __typename: "SearchResultItemEdge",
            },
            {
              cursor: "def",
              node: {
                title: "Sample Issue 2",
                createdAt: "2021-10-03T00:00:00Z",
                number: 2,
                state: IssueState.Open,
                author: null,
                __typename: "Issue",
              },
              __typename: "SearchResultItemEdge",
            },
            {
              cursor: "ghi",
              node: {
                title: "Sample Issue 3",
                createdAt: "2009-01-17T00:00:00Z",
                number: 3,
                state: IssueState.Open,
                author: null,
                __typename: "Issue",
              },
              __typename: "SearchResultItemEdge",
            },
          ],
        },
      } satisfies IssueSearchQuery,
    },
  },
];

jest.mock("react-markdown", async () => (props: any) => {
  return <>{props.children}</>;
});

it("successfully search for issues", async () => {
  //Given: Search page is active
  const { getByLabelText, getByText, findByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SearchPage />
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );

  //When: Searching for a term
  const searchField = getByLabelText("Search for Issues") as HTMLInputElement;
  expect(searchField).toBeInTheDocument();
  fireEvent.change(searchField, { target: { value: "test-searchTerm1" } });

  //Expect: Results are displayed correctly
  const progresssBar = await findByRole("progressbar");
  await waitForElementToBeRemoved(progresssBar);
  expect(getByText("3 Issues Found")).toBeInTheDocument();
  expect(getByText("Sample Issue 1")).toBeInTheDocument();
  expect(getByText("Sample Issue 2")).toBeInTheDocument();
  expect(getByText("Sample Issue 3")).toBeInTheDocument();
});

it("double quotes in search are ignored", async () => {
  //Given: Search page is active
  const { getByLabelText, getByText, findByRole, queryByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SearchPage />
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );

  //When: Searching for a term that contains double quotes
  const searchField = getByLabelText("Search for Issues") as HTMLInputElement;
  fireEvent.change(searchField, { target: { value: 'test-search"Term1' } });

  //Expect: Results are the same as without double quotes
  await findByRole("progressbar");
  await waitForElementToBeRemoved(queryByRole("progressbar"));
  expect(getByText("3 Issues Found")).toBeInTheDocument();
  expect(getByText("Sample Issue 1")).toBeInTheDocument();
  expect(getByText("Sample Issue 2")).toBeInTheDocument();
  expect(getByText("Sample Issue 3")).toBeInTheDocument();
});

it("failed queries display an error", async () => {
  // Given: Search page is active
  const { getByLabelText, getByText, findByRole, queryByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SearchPage />
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );

  // When: Performing a search that causes an error
  const searchField = getByLabelText("Search for Issues") as HTMLInputElement;
  fireEvent.change(searchField, { target: { value: 'test-search"Term2' } }); // No mock defined -> error

  // Expect: Error message is displayed
  await findByRole("progressbar");
  await waitForElementToBeRemoved(queryByRole("progressbar"));
  expect(
    getByText("Something went wrong. Please try again later")
  ).toBeInTheDocument();
});

it("previous searchs are cached", async () => {
  //Given: Search page is active
  const { getByLabelText, getByText, findByRole, queryByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SearchPage />
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );

  //When: Entering the same search term twice
  const searchField = getByLabelText("Search for Issues") as HTMLInputElement;
  fireEvent.change(searchField, { target: { value: "test-searchTerm1" } });
  await findByRole("progressbar");
  await waitForElementToBeRemoved(queryByRole("progressbar"));
  fireEvent.change(searchField, { target: { value: "test-searchTerm2" } });
  await findByRole("progressbar");
  await waitForElementToBeRemoved(queryByRole("progressbar"));
  fireEvent.change(searchField, { target: { value: "test-searchTerm1" } });
  await waitForElementToBeRemoved(
    getByText("Something went wrong. Please try again later")
  );

  //Expect: No loading on the second time
  expect(queryByRole("progressbar")).toBeNull();
});
