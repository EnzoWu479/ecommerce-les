module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/standard',
    'prettier/react',
    'next/core-web-vitals'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: true
      }
    ],
    camelcase: 'on',
    snakecase: 'on',
    'no-unused-expressions': 'off',
    'react/jsx-uses-react': 'off',
    'react/display-name': 'off',
    'space-before-function-paren': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    semi: [1, 'always']
  },
  settings: {
    'import/resolver': {
      typescript: {}
    },
    react: {
      version: 'detect'
    }
  }
};
