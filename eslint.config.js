import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['.astro/**/*', 'node_modules/**/*', 'dist/**/*'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // DOM APIs used in Astro server-side routes
        Response: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
  {
    files: ['**/sw.js', '**/public/sw.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        self: 'readonly',
        caches: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        Event: 'readonly',
        ExtendableEvent: 'readonly',
        FetchEvent: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'warn',
    },
  },
  {
    files: ['**/test/**/*.{js,ts}', '**/*.test.{js,ts}', '**/*.spec.{js,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        vi: 'readonly',
        global: 'readonly',
        document: 'readonly',
        window: 'readonly',
        NodeListOf: 'readonly',
        Storage: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'warn',
    },
  },
];
