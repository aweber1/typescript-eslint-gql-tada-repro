# Setup

`npm install`

# Repro steps

1. Run `npm run generate:schema` - this will generate a graphql schema file and types in the `generated` folder.

2. Run `npm run lint`

Observe that the linter will run but will not exit

# Workarounds

## Option 1 - adjust `typescript-eslint` settings

* Adjust `eslint.config.mjs`:
  - Set `parserOptions.projectService` to `false` (or omit the property)
  - Set `parserOptions.project` to the path of the `tsconfig.json` file or `true`

* Run `npm run lint`

Observe that the linter will run and exit

## Option 2 - adjust the `gql-tada` configuration

* Change the `tsconfig.gql-tada.json` file:
  - Set the `schema` property to a GraphQL schema endpoint URL instead of a local file

* Run `npm run lint`

Observe that the linter will run and exit

> Note: when `project` is `true` and the `gql-tada` `schema` property is set to a local file, the linter will run and exit as expected. The issue only occurs when `schema` is a local file _and_ `projectService` is `true`.
