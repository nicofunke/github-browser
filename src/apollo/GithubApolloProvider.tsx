import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";

const cache = new InMemoryCache({
  typePolicies: {
    Issue: {
      fields: {
        // Pagination strategy for loading issue comments
        comments: {
          keyArgs: false,
          merge(existing, incoming) {
            const existingEdges = existing?.edges || [];
            const incomingEdges = incoming?.edges || [];
            return {
              ...(existing || {}),
              ...(incoming || {}),
              edges: [...existingEdges, ...incomingEdges],
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: cache,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

/**
 * Apollo provider for github Graphql API queries
 */
export default function GithubApolloProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
