import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

const base = [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    }
  }
];

const typescript = tseslint.config({
  files: ['**/*.{ts,tsx,mts,cts}'],
  languageOptions: {
    parserOptions: {
      // when this is `true` and the gql.tada schema is loaded from a file,
      // the lint process does not exit.
      projectService: true,

      // when this is `true` and `projectService: false` and the gql.tada schema is loaded from a file,
      // the lint process works as expected.
      // project: true

      // uncomment this line to see what typescript-eslint is logging
      // debugLevel: ['typescript-eslint'],
    },
  },
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
  ],
});

export default [
  ...base,
  ...typescript,
]