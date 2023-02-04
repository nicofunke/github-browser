import { useQuery } from "@apollo/client";
import { selectSearchQuery } from "../../redux/SearchSlice";
import { useAppSelector } from "../../redux/reduxHooks";
import { Author } from "../../types/Author";
import { IssueInfo } from "../../types/IssueInfo";
import { IssueSearchResult } from "../../types/IssueSearchResult";
import { IssueState } from "../../types/IssueState";
import { gql } from "../../__generated__";
import { IssueSearchQuery } from "../../__generated__/graphql";

export const MAX_ISSUE_SEARCH_RESULTS = 12;

/**
 * Query to search for issues
 */
export const useIssueSearch = () => {
  const searchQuery = useAppSelector(selectSearchQuery);
  const queryResult = useQuery(SEARCH_ISSUES_BY_TERM, {
    variables: {
      searchQuery: searchQuery,
      last: MAX_ISSUE_SEARCH_RESULTS,
    },
  });
  return { ...queryResult, data: mapResultData(queryResult.data) };
};

/**
 * GraphQL query to search for issues
 */
export const SEARCH_ISSUES_BY_TERM = gql(`
query IssueSearch($searchQuery: String!, $last: Int!, $after: String) {
  search(type: ISSUE, query: $searchQuery, last: $last, after: $after) {
    issueCount
    edges {
      cursor
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
      cursor: edge?.cursor,
    };
  });
  return {
    issueCount: data?.search.issueCount || 0,
    issues: issues,
  };
}
