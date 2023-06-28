module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: { es6: true },
  extends: [
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/strict',
    // 'plugin:react/recommended',
    // 'next',
    // 'plugin:storybook/recommended',
    'prettier',
  ],
  rules: {
    // 1階層以上下に潜る相対importを禁止する
    'no-restricted-imports': ['error', { patterns: ['../'] }],
    '@next/next/no-html-link-for-pages': 'off',
  },
  overrides: [
    {
      files: ['**/*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    // {
    //   extends: ['@typescript-eslint/recommended-requiring-type-checking'],
    //   files: ['./**/*.{ts,tsx}'],
    // },
  ],
};
