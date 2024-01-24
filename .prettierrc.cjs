module.exports = {
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  semi: true,
  importOrder: ['^[./]', '^@/(.*)$'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderCaseInsensitive: true,
  overrides: [
    {
      files: '*.sol',
      options: {
        tabWidth: 4,
        printWidth: 120,
        singleQuote: false,
      },
    },
  ],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
