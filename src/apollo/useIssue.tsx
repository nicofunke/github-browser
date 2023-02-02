import { useQuery } from "@apollo/client";
import { Author } from "../types/Author";
import { Issue } from "../types/Issue";
import { gql } from "../__generated__";
import { LoadIssueQuery } from "../__generated__/graphql";

/**
 * Loads a single issue by number
 */
export default function useIssue(issueNumber: number) {
  const queryResult = useQuery(GET_ISSUE_BY_ID, {
    variables: { issueNumber },
  });
  return { ...queryResult, data: mapResultData(queryResult.data) };
}

/**
 * GraphQL query to laod a single issue by number
 */
const GET_ISSUE_BY_ID = gql(`
query LoadIssue($issueNumber: Int!) { 
  repository(owner:"facebook", name:"react") {
    id
    issue(number:$issueNumber) {
      id
      title
      number
      body
      state
      createdAt
      author {avatarUrl  login}
    }
  }
}
`);

function mapResultData(result: LoadIssueQuery | undefined): Issue | undefined {
  if (!result?.repository?.issue?.author) return undefined;
  return {
    ...result.repository.issue,
    createdAt: new Date(result.repository.issue.createdAt),
    author: result.repository.issue.author as Author | undefined,
  };
}
