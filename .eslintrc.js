module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    // "jquery": true
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  extends: [
    'prettier',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  settings: {
    react: {
      version: 'detect', // 自动读取已安装的react版本
    },
    'import/resolver': {
      webpack: {
        config: './build/webpack.config.js',
      },
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'space-before-function-paren': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-var': 'error', // 禁止使用 var
    'import/no-unresolved': ['error', { commonjs: true, amd: true }],
    'import/named': 'off',
    'import/order': 'error',
    'import/prefer-default-export': 'error',
  },
};
