import { CodegenConfig } from "@graphql-codegen/cli";

/**
 * Code generator to create Typescript types for GraphQL queries
 */
const config: CodegenConfig = {
  schema: "https://docs.github.com/public/schema.docs.graphql",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
