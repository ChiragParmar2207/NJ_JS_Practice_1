import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // ESLint recommended rules
  js.configs.recommended,

  // Disable ESLint rules that conflict with Prettier
  prettierConfig,

  {
    files: ['**/*.js'],

    plugins: {
      prettier,
    },

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        ...globals.node, // adds all Node.js globals (require, module, __dirname, process etc.)
        ...globals.es2021, // adds all ES2021 globals
      },
    },

    rules: {
      // Prettier as ESLint rule
      'prettier/prettier': 'error',

      // Code quality
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'off',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'warn',
      'consistent-return': 'warn',
      'no-duplicate-imports': 'error',

      // Node.js specific
      'handle-callback-err': 'error',
      'no-process-exit': 'warn',
      'no-path-concat': 'error',
    },
  },

  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.min.js',
    ],
  },
];
