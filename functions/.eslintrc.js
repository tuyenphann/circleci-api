module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'quotes': ['warn', 'single'],
    'import/no-unresolved': 0,
    'linebreak-style': 1,
    'no-invalid-this': 1,
    'max-len': 0,
    '@typescript-eslint/no-var-requires': 1,
    'camelcase': 1,
    'object-curly-spacing': 0,
    'require-jsdoc': 0,
    'indent': 0,
  },
};
