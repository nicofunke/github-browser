/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\nquery LoadIssue($issueNumber: Int!) { \n  repository(owner:\"facebook\", name:\"react\") {\n    id\n    issue(number:$issueNumber) {\n      id\n      title\n      number\n      body\n      state\n      createdAt\n      author {avatarUrl  login}\n    }\n  }\n}\n": types.LoadIssueDocument,
    "\nquery LoadIssueComments($issueNumber: Int!, $first: Int!, $after: String) { \n    repository(owner:\"facebook\", name:\"react\") {\n      id\n      issue(number:$issueNumber) {\n        comments( after: $after, first: $first) {\n          totalCount\n          edges {\n            cursor\n            node {\n              id\n              body\n              createdAt\n              author {\n                login\n                avatarUrl\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.LoadIssueCommentsDocument,
    "\nquery IssueSearch($searchQuery: String!, $last: Int!, $after: String) {\n  search(type: ISSUE, query: $searchQuery, last: $last, after: $after) {\n    issueCount\n    edges {\n      node {\n        ... on Issue {\n          title\n          createdAt\n          number\n          state\n          author {avatarUrl  login}\n        }\n      }\n    }\n  }\n}\n  ": types.IssueSearchDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery LoadIssue($issueNumber: Int!) { \n  repository(owner:\"facebook\", name:\"react\") {\n    id\n    issue(number:$issueNumber) {\n      id\n      title\n      number\n      body\n      state\n      createdAt\n      author {avatarUrl  login}\n    }\n  }\n}\n"): (typeof documents)["\nquery LoadIssue($issueNumber: Int!) { \n  repository(owner:\"facebook\", name:\"react\") {\n    id\n    issue(number:$issueNumber) {\n      id\n      title\n      number\n      body\n      state\n      createdAt\n      author {avatarUrl  login}\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery LoadIssueComments($issueNumber: Int!, $first: Int!, $after: String) { \n    repository(owner:\"facebook\", name:\"react\") {\n      id\n      issue(number:$issueNumber) {\n        comments( after: $after, first: $first) {\n          totalCount\n          edges {\n            cursor\n            node {\n              id\n              body\n              createdAt\n              author {\n                login\n                avatarUrl\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\nquery LoadIssueComments($issueNumber: Int!, $first: Int!, $after: String) { \n    repository(owner:\"facebook\", name:\"react\") {\n      id\n      issue(number:$issueNumber) {\n        comments( after: $after, first: $first) {\n          totalCount\n          edges {\n            cursor\n            node {\n              id\n              body\n              createdAt\n              author {\n                login\n                avatarUrl\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery IssueSearch($searchQuery: String!, $last: Int!, $after: String) {\n  search(type: ISSUE, query: $searchQuery, last: $last, after: $after) {\n    issueCount\n    edges {\n      node {\n        ... on Issue {\n          title\n          createdAt\n          number\n          state\n          author {avatarUrl  login}\n        }\n      }\n    }\n  }\n}\n  "): (typeof documents)["\nquery IssueSearch($searchQuery: String!, $last: Int!, $after: String) {\n  search(type: ISSUE, query: $searchQuery, last: $last, after: $after) {\n    issueCount\n    edges {\n      node {\n        ... on Issue {\n          title\n          createdAt\n          number\n          state\n          author {avatarUrl  login}\n        }\n      }\n    }\n  }\n}\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;