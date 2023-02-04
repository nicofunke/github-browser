import { useQuery } from "@apollo/client";
import { Author } from "../../types/Author";
import { IssueComments } from "../../types/IssueComment";
import { gql } from "../../__generated__";
import { LoadIssueCommentsQuery } from "../../__generated__/graphql";

const MAX_COMMENTS = 12;

/**
 * Loads a list of comments for an issue
 */
export default function useIssueComments(issueNumber: number) {
  const queryResult = useQuery(GET_ISSUE_COMMENTS, {
    variables: { issueNumber, first: MAX_COMMENTS },
  });
  return { ...queryResult, data: mapResultData(queryResult.data) };
}

/**
 * GraphQL query to load comments for an issue
 */
const GET_ISSUE_COMMENTS = gql(`
query LoadIssueComments($issueNumber: Int!, $first: Int!, $after: String) { 
    repository(owner:"facebook", name:"react") {
      id
      issue(number:$issueNumber) {
        comments( after: $after, first: $first, orderBy: {field: UPDATED_AT, direction: ASC}) {
          totalCount
          edges {
            cursor
            node {
              id
              body
              createdAt
              author {
                login
                avatarUrl
              }
            }
          }
        }
      }
    }
  }
`);

function mapResultData(
  queryData?: LoadIssueCommentsQuery
): IssueComments | undefined {
  if (!queryData?.repository?.issue?.comments.edges) return undefined;
  const edges = queryData?.repository?.issue?.comments.edges;
  return {
    totalCount: queryData.repository.issue.comments.totalCount,
    comments:
      edges.map((edge) => ({
        author: edge?.node?.author as Author | undefined,
        cursor: edge?.cursor || "",
        body: edge?.node?.body || "",
        createdAt: new Date(edge?.node?.createdAt),
        id: edge?.node?.id || "",
      })) || [],
  };
}
