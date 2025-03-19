import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/graphql",
  documents: ["./app/**/*.{ts,tsx}"],
  generates: {
    "./app/generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      plugins: ["typescript", "typescript-operations"],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
