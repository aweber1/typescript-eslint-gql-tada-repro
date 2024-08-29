/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import path from 'node:path';
import { generateOutput, generateSchema } from '@gql.tada/cli-utils';

await main();

async function main() {

  await generateSchema({
    input: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    headers: undefined,
    // important: the `output` path should match the `schema` path defined
    // in the `tsconfig.json` file for the `@0no-co/graphqlsp` plugin.
    output: path.resolve(process.cwd(), './generated/schema.graphql'),
    tsconfig: path.resolve(process.cwd(), './tsconfig.json'),
  });

  await generateOutput({
    output: undefined,
    tsconfig: undefined,
  });
}
