const path = require('path');

const buildLintCommand = (filenames) =>
  `eslint ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

const buildSolhintCommand = (filenames) =>
  `solhint -c packages/eslint-config-common/.solhint.json --ignore-path .gitignore ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')} `;

const buildPrettierCommand = (filenames) =>
  `prettier --check ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')} `;

module.exports = {
  '**/*.{js,jsx,ts,tsx}': [buildLintCommand],
  '**/*.{js,jsx,ts,tsx,sol,json}': [buildPrettierCommand],
  '**/*.sol': [buildSolhintCommand],
};
