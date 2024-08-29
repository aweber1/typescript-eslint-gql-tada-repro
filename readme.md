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


## Investigation notes

There seems to be some sort of conflict between the `typescript-eslint` `projectService` and the `gql-tada` "GraphQLSP" when `projectService` is enabled.

I have tracked it down to where I think the conflict/issue stems from, and it's when the GraphQLSP loads a schema and attaches a watcher to it, i.e. `schema.autoupdate`:
https://github.com/0no-co/GraphQLSP/blob/1ef3b51b7c83bf3972d4cabf0f1b7b66e8472071/packages/graphqlsp/src/graphql/getSchema.ts#L152

When `projectService` is enabled, the lint process seems to hang after calling `ref.autoupdate()` in the linked code above. If I remove that `autoupdate` call manually, the process will exit as expected with `projectService` enabled.

When `projectService` is disabled, the lint process will exit as expected even with the `autoupdate` call in place.
