// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'class',
          modifiers: ['exported'],
          format: ['PascalCase'],
          suffix: ['Component', 'Service', 'Directive', 'Pipe', 'Guard', 'Store'],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: "Decorator[expression.callee.name='Component'] Property[key.name='standalone']",
          message:
            'Do not specify "standalone" in @Component. Angular 19+ treats all components as standalone by default.',
        },
        {
          selector: "Decorator[expression.callee.name='Directive'] Property[key.name='standalone']",
          message:
            'Do not specify "standalone" in @Directive. Angular 19+ treats all components as standalone by default.',
        },
        {
          selector: "Decorator[expression.callee.name='Pipe'] Property[key.name='standalone']",
          message:
            'Do not specify "standalone" in @Pipe. Angular 19+ treats all components as standalone by default.',
        },
      ],
      '@/no-console': ['error'],
      '@/no-alert': ['error'],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
]);
