import { useLazyQuery } from "@apollo/client";
import { useCallback } from "react";
import { Author } from "../types/Author";
import { IssueInfo } from "../types/IssueInfo";
import { IssueSearchResult } from "../types/IssueSearchResult";
import { IssueState } from "../types/IssueState";
import { gql } from "../__generated__";
import { IssueSearchQuery } from "../__generated__/graphql";

const MAX_RESULTS = 12;

/**
 * Lazy query to search for issues
 */
export const useIssueSearch = () => {
  const [executeQuery, queryResult] = useLazyQuery(SEARCH_ISSUES_BY_TERM);
  const search = useCallback(
    (searchTerm: string, state?: IssueState) =>
      executeQuery({
        variables: {
          searchQuery: getSearchQuery(searchTerm, state),
          last: MAX_RESULTS,
        },
      }),
    [executeQuery]
  );
  return { ...queryResult, search, data: mapResultData(queryResult.data) };
};

/**
 * Helper function to generate the search query for issue search
 */
const getSearchQuery = (searchTerm: string, state?: IssueState) =>
  `repo:facebook/react ${
    state ? `is:${state}` : ""
  } ${searchTerm} in:title is:public is:issue`;

/**
 * GraphQL query to search for issues
 */
const SEARCH_ISSUES_BY_TERM = gql(`
query IssueSearch($searchQuery: String!, $last: Int!, $after: String) {
  search(type: ISSUE, query: $searchQuery, last: $last, after: $after) {
    issueCount
    edges {
      node {
        ... on Issue {
          title
          createdAt
          number
          state
          author {avatarUrl  login}
        }
      }
    }
  }
}
  `);

function mapResultData(data?: IssueSearchQuery): IssueSearchResult {
  const edges = data?.search.edges || [];
  const issues: IssueInfo[] = edges.map((edge) => {
    const node = edge!.node as any;
    return {
      title: node.title as string,
      author: node.author as Author | undefined,
      createdAt: new Date(node.createdAt as string),
      issueNumber: node.number as number,
      state: node.state as IssueState,
    };
  });
  return {
    issueCount: data?.search.issueCount || 0,
    issues: issues,
  };
}
