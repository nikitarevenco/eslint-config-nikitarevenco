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

let newRuleNames = {
  "react-hooks": "hooks",
  "jsx-a11y": "a11y",
  react: "react",
  unicorn: "unicorn",
  sonarjs: "sonar",
  tailwindcss: "tw",
  "simple-import-sort": "import",
  "@next/next": "next",
  security: "security",
  promise: "promise",
  "import-x": "importx",
  "eslint-comments": "comment",
  prettier: "prettier",
  functional: "func",
  regexp: "RegExp",
  "@typescript-eslint": "ts",
};

const renameRules = (
  rules: Record<string, any>,
  oldPrefix: keyof typeof newRuleNames,
) => {
  const newPrefix = newRuleNames[oldPrefix];
  return Object.fromEntries(
    Object.entries(rules).map(([ruleName, ruleValue]) => [
      ruleName.replace(new RegExp(`^${oldPrefix}`), newPrefix),
      ruleValue,
    ]),
  );
};

const renameRulesTypeScript = (tsConfig: any) => {
  return Object.fromEntries(
    Object.entries(tsConfig).map(([key, value]) => {
      const newValue =
        key === "rules"
          ? renameRules(value as any, "@typescript-eslint")
          : value;

      return [
        key,
        key === "plugins" && "@typescript-eslint" in (value as any)
          ? Object.fromEntries(
              Object.entries(value as any).map(([pluginName, pluginValue]) => [
                pluginName === "@typescript-eslint"
                  ? newRuleNames["@typescript-eslint"]
                  : pluginName,
                pluginValue,
              ]),
            )
          : newValue,
      ];
    }),
  );
};

const reactRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: {
          [newRuleNames["jsx-a11y"]]: jsxA11y,
          [newRuleNames["react"]]: react,
          [newRuleNames["react-hooks"]]: fixupPluginRules(reactHooks),
        },
        rules: {
          ...renameRules(jsxA11y.flatConfigs.strict.rules, "jsx-a11y"),
          ...renameRules(react.configs.flat.all.rules, "react"),
          ...renameRules(reactHooks.configs.recommended.rules, "react-hooks"),
          [`${newRuleNames["react"]}/forbid-component-props`]: "off",
          [`${newRuleNames["react"]}/jsx-filename-extension`]: [
            "error",
            { extensions: [".jsx", ".tsx"] },
          ],
          [`${newRuleNames["react"]}/jsx-max-depth`]: "off",
          [`${newRuleNames["react"]}/jsx-no-bind`]: [
            "error",
            { allowArrowFunctions: true },
          ],
          [`${newRuleNames["react"]}/jsx-no-constructed-context-values`]: "off",
          [`${newRuleNames["react"]}/jsx-no-leaked-render`]: "off",
          [`${newRuleNames["react"]}/jsx-no-literals`]: "off",
          [`${newRuleNames["react"]}/jsx-props-no-spreading`]: "off",
          [`${newRuleNames["react"]}/jsx-sort-props`]: "off",
          [`${newRuleNames["react"]}/no-multi-comp`]: "off",
          [`${newRuleNames["react"]}/no-unescaped-entities`]: "off",
          [`${newRuleNames["react"]}/prop-types`]: [
            "error",
            { ignore: ["className"] },
          ],
          [`${newRuleNames["react"]}/react-in-jsx-scope`]: "off",
          [`${newRuleNames["react"]}/require-default-props`]: "off",
          ...rulesConfig,
        },
      }
    : {};
};

const unicornRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { [newRuleNames["unicorn"]]: unicorn },
        rules: {
          ...renameRules(unicorn.configs["flat/all"].rules!, "unicorn"),
          [`${newRuleNames["unicorn"]}/no-array-reduce`]: "off",
          [`${newRuleNames["unicorn"]}/no-keyword-prefix`]: "off",
          [`${newRuleNames["unicorn"]}/no-null`]: "off",
          [`${newRuleNames["unicorn"]}/prefer-at`]: [
            "error",
            { checkAllIndexAccess: true },
          ],
          [`${newRuleNames["unicorn"]}/prevent-abbreviations`]: "off",
          ...rulesConfig,
        },
      }
    : {};
};

const sonarRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { [newRuleNames["sonarjs"]]: sonar },
        rules: {
          ...renameRules(sonar.configs.recommended.rules!, "sonarjs"),
          ...rulesConfig,
        },
      }
    : {};
};

const tailwindRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { [newRuleNames["tailwindcss"]]: tailwindcss },
        rules: {
          [`${newRuleNames["tailwindcss"]}/enforces-negative-arbitrary-values`]:
            "error",
          [`${newRuleNames["tailwindcss"]}/enforces-shorthand`]: "error",
          [`${newRuleNames["tailwindcss"]}/no-contradicting-classname`]:
            "error",
          [`${newRuleNames["tailwindcss"]}/no-unnecessary-arbitrary-value`]:
            "error",
          ...rulesConfig,
        },
      }
    : {};
};

const importSortRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { [newRuleNames["simple-import-sort"]]: simpleImportSort },
        rules: {
          [`${newRuleNames["simple-import-sort"]}/exports`]: "error",
          [`${newRuleNames["simple-import-sort"]}/imports`]: "error",
          ...rulesConfig,
        },
      }
    : {};
};

const nextRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { [newRuleNames["@next/next"]]: fixupPluginRules(next) },
        rules: {
          ...renameRules(next.configs.recommended.rules, "@next/next"),
          ...rulesConfig,
        },
      }
    : {};
};

const securityRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { [newRuleNames["security"]]: security },
        rules: {
          ...renameRules(security.configs.recommended.rules, "security"),
          ...rulesConfig,
        },
      }
    : {};
};

const promiseRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { [newRuleNames["promise"]]: promise },
        rules: {
          ...renameRules(promise.configs["flat/recommended"].rules, "promise"),
          [`${newRuleNames["promise"]}/always-return`]: "off",
          [`${newRuleNames["promise"]}/catch-or-return`]: "off",
          ...rulesConfig,
        },
      }
    : {};
};

const importRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { [newRuleNames["import-x"]]: importX },
        rules: {
          ...renameRules(importX.configs.recommended.rules, "import-x"),
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
        plugins: {
          [newRuleNames["eslint-comments"]]: fixupPluginRules(eslintComments),
        },
        rules: {
          ...renameRules(
            eslintComments.configs.recommended.rules,
            "eslint-comments",
          ),
          [`${newRuleNames["eslint-comments"]}/require-description`]: "error",
          [`${newRuleNames["eslint-comments"]}/no-unused-disable`]: "error",
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
      ].map(renameRulesTypeScript)
    : [];
};

const prettierRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { [newRuleNames["prettier"]]: prettier },
        rules: {
          ...configPrettier.rules,
          [`${newRuleNames["prettier"]}/prettier`]: ["warn"],
          ...rulesConfig,
        },
      }
    : {};
};

const functionalRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { [newRuleNames["functional"]]: functional },
        rules: {
          ...renameRules(functional.configs.noMutations.rules!, "functional"),
          [`${newRuleNames["functional"]}/prefer-immutable-types`]: "off",
          ...rulesConfig,
        },
      }
    : {};
};

const regexpRules = (rulesConfig: RulesConfig = {}) => {
  return rulesConfig
    ? {
        plugins: { [newRuleNames["regexp"]]: regexp },
        rules: {
          ...renameRules(regexp.configs["flat/all"].rules, "regexp"),
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
  {
    project,
    tsconfigRootDir,
    renames,
  }: {
    project: string;
    tsconfigRootDir: string;
    renames?: Record<keyof typeof newRuleNames, string>;
  },
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
  newRuleNames = { ...newRuleNames, ...renames };

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
              alwaysTryTypes: true,
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
