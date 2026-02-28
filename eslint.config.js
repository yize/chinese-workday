import globals from 'globals'
import prettier from 'eslint-config-prettier'

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        console: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      ...prettier.rules
    }
  },
  {
    ignores: ['dist/', 'node_modules/', '*.min.js']
  }
]
