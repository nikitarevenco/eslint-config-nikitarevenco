// @ts-ignore
import regexp from "eslint-plugin-regexp";
import functional from "eslint-plugin-functional";
import prettier from "eslint-plugin-prettier";
// @ts-ignore
import configPrettier from "eslint-config-prettier";
import typescript from "typescript-eslint";
// @ts-ignore
import eslintComments from "eslint-plugin-eslint-comments";
// @ts-ignore
import javascript from "@eslint/js";
import importX from "eslint-plugin-import-x";
// @ts-ignore
import promise from "eslint-plugin-promise";
// @ts-ignore
import security from "eslint-plugin-security";
// @ts-ignore
import next from "@next/eslint-plugin-next";
import simpleImportSort from "eslint-plugin-simple-import-sort";
// @ts-ignore
import tailwindcss from "eslint-plugin-tailwindcss";
import sonar from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
// @ts-ignore
import reactHooks from "eslint-plugin-react-hooks";
// @ts-ignore
import react from "eslint-plugin-react";
// @ts-ignore
import jsxA11y from "eslint-plugin-jsx-a11y";
import typescriptEslint from "typescript-eslint";
import { fixupPluginRules } from "@eslint/compat";
type Overrides = Record<string, any>;
type RulesConfig = Overrides | false;

const reactRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: {
          "jsx-a11y": jsxA11y,
          react: react,
          "react-hooks": fixupPluginRules(reactHooks),
        },
        rules: {
          ...jsxA11y.flatConfigs.strict.rules,
          ...react.configs.flat.all.rules,
          ...reactHooks.configs.recommended.rules,
          "react/forbid-component-props": "off",
          "react/jsx-filename-extension": [
            "error",
            { extensions: [".jsx", ".tsx"] },
          ],
          "react/jsx-max-depth": "off",
          "react/jsx-no-bind": ["error", { allowArrowFunctions: true }],
          "react/jsx-no-constructed-context-values": "off",
          "react/jsx-no-leaked-render": "off",
          "react/jsx-no-literals": "off",
          "react/jsx-props-no-spreading": "off",
          "react/jsx-sort-props": "off",
          "react/no-multi-comp": "off",
          "react/no-unescaped-entities": "off",
          "react/prop-types": ["error", { ignore: ["className"] }],
          "react/react-in-jsx-scope": "off",
          "react/require-default-props": "off",
          ...rulesConfig,
        },
      }
    : {};
};

const unicornRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { unicorn: unicorn },
        rules: {
          ...unicorn.configs["flat/all"].rules,
          "unicorn/no-array-reduce": "off",
          "unicorn/no-keyword-prefix": "off",
          "unicorn/no-null": "off",
          "unicorn/prefer-at": ["error", { checkAllIndexAccess: true }],
          "unicorn/prevent-abbreviations": "off",
          ...rulesConfig,
        },
      }
    : {};
};

const sonarRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { sonarjs: sonar },
        rules: {
          ...sonar.configs.recommended.rules,
          ...rulesConfig,
        },
      }
    : {};
};

const tailwindRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { tailwindcss },
        rules: {
          "tailwindcss/enforces-negative-arbitrary-values": "error",
          "tailwindcss/enforces-shorthand": "error",
          "tailwindcss/no-contradicting-classname": "error",
          "tailwindcss/no-unnecessary-arbitrary-value": "error",
          ...rulesConfig,
        },
      }
    : {};
};

const importSortRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { "simple-import-sort": simpleImportSort },
        rules: {
          "simple-import-sort/exports": "error",
          "simple-import-sort/imports": "error",
          ...rulesConfig,
        },
      }
    : {};
};

const nextRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { "@next/next": fixupPluginRules(next) },
        rules: {
          ...next.configs.recommended.rules,
          ...rulesConfig,
        },
      }
    : {};
};

const securityRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { security },
        rules: {
          ...security.configs.recommended.rules,
          ...rulesConfig,
        },
      }
    : {};
};

const promiseRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { promise },
        rules: {
          ...promise.configs["flat/recommended"].rules,
          "promise/always-return": "off",
          "promise/catch-or-return": "off",
          ...rulesConfig,
        },
      }
    : {};
};

const importRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { "import-x": importX },
        rules: {
          ...importX.configs.recommended.rules,
          ...rulesConfig,
        },
      }
    : {};
};

const javascriptRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        rules: {
          ...javascript.configs.all.rules,
          "capitalized-comments": "off",
          "class-methods-use-this": "off",
          "consistent-return": "off",
          "default-param-last": "off",
          "func-style": "off",
          "prefer-destructuring": "off",
          "no-use-before-define": "off",
          "id-length": "off",
          "init-declarations": "off",
          "max-lines-per-function": "off",
          "max-params": "off",
          "max-statements": "off",
          "multiline-comment-style": "off",
          "no-loop-func": "off",
          "new-cap": "off",
          "sort-imports": "off",
          "sort-keys": "off",
          "no-duplicate-imports": "off",
          "no-magic-numbers": "off",
          "no-shadow": "off",
          "no-ternary": "off",
          "no-underscore-dangle": "off",
          "no-unused-expressions": "off",
          "no-void": ["error", { allowAsStatement: true }],
          "one-var": ["error", "never"],
          ...rulesConfig,
        },
      }
    : {};
};

const eslintCommentsRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { "eslint-comments": fixupPluginRules(eslintComments) },
        rules: {
          ...eslintComments.configs.recommended.rules,
          "eslint-comments/require-description": "error",
          "eslint-comments/no-unused-disable": "error",
          ...rulesConfig,
        },
      }
    : {};
};

const typescriptRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? [
        ...typescript.configs.strictTypeChecked,
        ...typescript.configs.stylisticTypeChecked,
        {
          rules: {
            "@typescript-eslint/array-type": [
              "error",
              { default: "array-simple", readonly: "array-simple" },
            ],
            "@typescript-eslint/naming-convention": [
              "error",
              {
                selector: ["memberLike", "property", "parameter"],
                format: ["camelCase"],
              },
              {
                selector: ["typeLike"],
                format: ["PascalCase"],
              },
              {
                selector: ["function"],
                format: ["camelCase", "PascalCase"],
              },
              // Required prefix for boolean variables
              {
                selector: "variable",
                types: ["boolean"],
                format: ["camelCase"],
                prefix: ["is", "should", "has", "can", "did", "will"],
              },
              // Ignore naming convention if we are required to use quotes to access a property e.g. Set-Cookie
              {
                selector: [
                  "classProperty",
                  "objectLiteralProperty",
                  "typeProperty",
                  "method",
                  "accessor",
                  "enumMember",
                ],
                format: null,
                modifiers: ["requiresQuotes"],
              },
              // Ignore naming convention for destructured variables for consistency
              {
                selector: "variable",
                modifiers: ["destructured"],
                format: null,
              },
            ],
            "@typescript-eslint/class-methods-use-this": "error",
            "@typescript-eslint/consistent-type-definitions": ["error", "type"],
            "@typescript-eslint/consistent-type-imports": [
              "error",
              {
                fixStyle: "inline-type-imports",
                prefer: "type-imports",
              },
            ],
            "@typescript-eslint/consistent-type-exports": "error",
            "@typescript-eslint/default-param-last": "error",
            "@typescript-eslint/init-declarations": "error",
            "@typescript-eslint/no-loop-func": "error",
            "@typescript-eslint/max-params": "error",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-explicit-any": [
              "error",
              { fixToUnknown: true },
            ],
            "@typescript-eslint/no-shadow": "error",
            "@typescript-eslint/no-use-before-define": "error",
            "@typescript-eslint/no-useless-empty-export": "error",
            "@typescript-eslint/parameter-properties": "error",
            "@typescript-eslint/no-unnecessary-parameter-property-assignment":
              "error",
            "@typescript-eslint/prefer-destructuring": "error",
            "@typescript-eslint/promise-function-async": "error",
            "@typescript-eslint/no-unnecessary-qualifier": "error",
            "@typescript-eslint/no-unused-vars": [
              "error",
              {
                argsIgnorePattern: "^_$",
                varsIgnorePattern: "^_$",
                caughtErrorsIgnorePattern: "^_$",
              },
            ],
            "@typescript-eslint/restrict-template-expressions": [
              "error",
              {
                allowBoolean: true,
                allowNullish: true,
                allowNumber: true,
                allowRegExp: true,
              },
            ],
            "@typescript-eslint/switch-exhaustiveness-check": [
              "error",
              { requireDefaultForNonUnion: true },
            ],
            ...rulesConfig,
          },
        },
      ]
    : [];
};

const prettierRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { prettier },
        rules: {
          ...configPrettier.rules,
          "prettier/prettier": ["warn"],
          ...rulesConfig,
        },
      }
    : {};
};

const functionalRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { functional },
        rules: {
          ...functional.configs.noMutations.rules,
          "functional/prefer-immutable-types": "off",
          ...rulesConfig,
        },
      }
    : {};
};

const regexpRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { regexp },
        rules: {
          ...regexp.configs["flat/all"].rules,
          ...rulesConfig,
        },
      }
    : {};
};

type ConfigItem =
  | "javascript"
  | "react"
  | "unicorn"
  | "sonarjs"
  | "tailwindcss"
  | "importSort"
  | "promise"
  | "nextjs"
  | "importx"
  | "security"
  | "eslintComments"
  | "typescript"
  | "prettier"
  | "functional"
  | "regexp";

export default (
  project: string,
  tsconfigRootDir: string,
  {
    javascript = {},
    react = {},
    unicorn = {},
    sonarjs = {},
    tailwindcss = {},
    importSort = {},
    nextjs = {},
    security = {},
    promise = {},
    importx = {},
    eslintComments = {},
    typescript = {},
    prettier = {},
    functional = {},
    regexp = {},
  }: Partial<Record<ConfigItem, RulesConfig>> = {},
  ...additionalEslintConfigs: any[]
) => {
  return typescriptEslint.config(
    ...([
      javascriptRules(javascript),
      reactRules(react),
      unicornRules(unicorn),
      sonarRules(sonarjs),
      tailwindRules(tailwindcss),
      importSortRules(importSort),
      nextRules(nextjs),
      securityRules(security),
      promiseRules(promise),
      importRules(importx),
      eslintCommentsRules(eslintComments),
      ...typescriptRules(typescript),
      prettierRules(prettier),
      functionalRules(functional),
      regexpRules(regexp),
      {
        languageOptions: {
          parserOptions: {
            ecmaFeatures: {
              jsx: true,
            },
            project: true,
            tsconfigRootDir,
          },
        },
        settings: {
          "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
          },
          "import/resolver": {
            typescript: {
              alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
              project,
            },
          },
          react: {
            version: "detect",
          },
        },
      },
    ] as any),
    ...additionalEslintConfigs,
  );
};
