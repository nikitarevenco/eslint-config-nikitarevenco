import type { FlatConfig } from "@eslint/compat";
import { fixupPluginRules } from "@eslint/compat";
// @ts-expect-error - @eslint/js does not provide TypeScript types
import javascript from "@eslint/js";
// @ts-expect-error - @next/eslint-plugin-next does not provide TypeScript types
import next from "@next/eslint-plugin-next";
import { type Linter } from "eslint";
// @ts-expect-error - eslint-config-prettier does not provide TypeScript types
import configPrettier from "eslint-config-prettier";
// @ts-expect-error - eslint-plugin-eslint-comments does not provide TypeScript types
import eslintComments from "eslint-plugin-eslint-comments";
/* eslint importx/no-unresolved: "off" -- path exists */
import functional from "eslint-plugin-functional";
import importX from "eslint-plugin-import-x";
// @ts-expect-error - eslint-plugin-jsx-a11y does not provide TypeScript types
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
// @ts-expect-error - eslint-plugin-promise does not provide TypeScript types
import promise from "eslint-plugin-promise";
// @ts-expect-error - eslint-plugin-react does not provide TypeScript types
import react from "eslint-plugin-react";
// @ts-expect-error - eslint-plugin-react-hooks does not provide TypeScript types
import reactHooks from "eslint-plugin-react-hooks";
import regexp from "eslint-plugin-regexp";
// @ts-expect-error - eslint-plugin-security does not provide TypeScript types
import security from "eslint-plugin-security";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sonar from "eslint-plugin-sonarjs";
// @ts-expect-error - eslint-plugin-tailwindcss does not provide TypeScript types
import tailwindcss from "eslint-plugin-tailwindcss";
import unicorn from "eslint-plugin-unicorn";
import typescript from "typescript-eslint";
type Overrides = Record<string, unknown>;
type RulesConfig = Overrides | false;

const newRuleNames = {
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
} as const;

/** Original names of rules as denoted by plugin authors */
type OldPrefixes = keyof typeof newRuleNames;

type NewPrefixes = (typeof newRuleNames)[OldPrefixes];

type GetNewPrefix<OldRuleName extends OldPrefixes> =
  (typeof newRuleNames)[OldRuleName];

type RuleEntry = Linter.RuleEntry<unknown[]>;

type RulesRecord<Prefix extends NewPrefixes | OldPrefixes | "" = ""> =
  Prefix extends ""
    ? Record<string, RuleEntry>
    : Record<`${Prefix}/${string}`, RuleEntry>;

const renameRules = <OldPrefix extends OldPrefixes>(
  rules: RulesRecord,
  oldPrefix: OldPrefix,
  newPrefix: string,
) => {
  const replace = `^${oldPrefix}`;
  return Object.fromEntries(
    Object.entries(rules).map(([ruleName, ruleValue]) => [
      ruleName.replace(new RegExp(replace, "u"), newPrefix),
      ruleValue,
    ]),
  ) as RulesRecord<GetNewPrefix<OldPrefix>>;
};

const renameRulesTypeScript = (
  tsConfig: Linter.Config<RulesRecord<"@typescript-eslint">>,
  newPrefix: string,
): Linter.Config<RulesRecord<GetNewPrefix<"@typescript-eslint">>> =>
  Object.fromEntries(
    (
      Object.entries(tsConfig) as Array<
        [
          keyof Linter.Config<RulesRecord<"@typescript-eslint">>,
          Linter.Config<RulesRecord<"@typescript-eslint">>[keyof Linter.Config<
            RulesRecord<"@typescript-eslint">
          >],
        ]
      >
    ).map(([key, value]) => {
      const newValue =
        /* eslint sonar/no-duplicate-string: "off" -- Would not make the code cleaner if we had defined a constant for it */
        key === "rules"
          ? /* eslint no-inline-comments: "off" -- Auto fixes to add an inline comment, will fix later */
            // @ts-expect-error -- Will error otherwise
            renameRules(value, "@typescript-eslint", newPrefix)
          : value;

      return [
        key,
        // @ts-expect-error -- Will error otherwise
        key === "plugins" && "@typescript-eslint" in value
          ? Object.fromEntries(
              Object.entries(value).map(([pluginName, pluginValue]) => [
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

const reactHooksRules = (
  rulesConfig: RulesConfig,
  reactHooksPrefix: string,
) => ({
  plugins: {
    /* eslint ts/no-unsafe-argument: "off" -- Module has no type declarations */
    [reactHooksPrefix]: fixupPluginRules(reactHooks),
  },
  rules: {
    ...renameRules(
      reactHooks.configs.recommended.rules,
      "react-hooks",
      reactHooksPrefix,
    ),
    ...rulesConfig,
  },
});

const jsxA11yRules = (rulesConfig: RulesConfig, jsxA11yPrefix: string) => ({
  plugins: {
    /* eslint ts/no-unsafe-assignment: "off" -- Module has no type declarations */
    [jsxA11yPrefix]: jsxA11y,
  },
  rules: {
    /* eslint ts/no-unsafe-member-access: "off" -- Module has no type declarations */
    ...renameRules(jsxA11y.flatConfigs.strict.rules, "jsx-a11y", jsxA11yPrefix),
    ...rulesConfig,
  },
});

const reactRules = (rulesConfig: RulesConfig, reactPrefix: string) => ({
  plugins: {
    [reactPrefix]: react,
  },
  rules: {
    ...renameRules(react.configs.flat.all.rules, "react", reactPrefix),
    [`${reactPrefix}/forbid-component-props`]: "off",
    [`${reactPrefix}/jsx-filename-extension`]: [
      "error",
      { extensions: [".jsx", ".tsx"] },
    ],
    [`${reactPrefix}/jsx-max-depth`]: "off",
    [`${reactPrefix}/jsx-no-bind`]: ["error", { allowArrowFunctions: true }],
    [`${reactPrefix}/jsx-no-constructed-context-values`]: "off",
    [`${reactPrefix}/jsx-no-leaked-render`]: "off",
    [`${reactPrefix}/jsx-no-literals`]: "off",
    [`${reactPrefix}/jsx-props-no-spreading`]: "off",
    [`${reactPrefix}/jsx-sort-props`]: "off",
    [`${reactPrefix}/no-multi-comp`]: "off",
    [`${reactPrefix}/no-unescaped-entities`]: "off",
    [`${reactPrefix}/prop-types`]: ["error", { ignore: ["className"] }],
    [`${reactPrefix}/react-in-jsx-scope`]: "off",
    [`${reactPrefix}/require-default-props`]: "off",
    ...rulesConfig,
  },
});

const unicornRules = (rulesConfig: RulesConfig, unicornPrefix: string) =>
  rulesConfig
    ? {
        plugins: { [unicornPrefix]: unicorn },
        rules: {
          ...renameRules(
            // @ts-expect-error -- Will refactor later
            unicorn.configs["flat/all"].rules,
            "unicorn",
            unicornPrefix,
          ),
          [`${unicornPrefix}/no-array-reduce`]: "off",
          [`${unicornPrefix}/no-keyword-prefix`]: "off",
          [`${unicornPrefix}/no-null`]: "off",
          [`${unicornPrefix}/prefer-at`]: [
            "error",
            { checkAllIndexAccess: true },
          ],
          [`${unicornPrefix}/prevent-abbreviations`]: "off",
          ...rulesConfig,
        },
      }
    : {};

const sonarRules = (rulesConfig: RulesConfig, sonarPrefix: string) => ({
  plugins: { [sonarPrefix]: sonar },
  rules: {
    // @ts-expect-error -- Will refactor later
    ...renameRules(sonar.configs.recommended.rules, "sonarjs", sonarPrefix),
    ...rulesConfig,
  },
});

const tailwindRules = (rulesConfig: RulesConfig, tailwindPrefix: string) => ({
  plugins: { [tailwindPrefix]: tailwindcss },
  rules: {
    [`${tailwindPrefix}/enforces-negative-arbitrary-values`]: "error",
    [`${tailwindPrefix}/enforces-shorthand`]: "error",
    [`${tailwindPrefix}/no-contradicting-classname`]: "error",
    [`${tailwindPrefix}/no-unnecessary-arbitrary-value`]: "error",
    ...rulesConfig,
  } as Record<string, RuleEntry>,
});

const importSortRules = (
  rulesConfig: RulesConfig,
  importSortPrefix: string,
) => ({
  plugins: { [importSortPrefix]: simpleImportSort },
  rules: {
    [`${importSortPrefix}/exports`]: "error",
    [`${importSortPrefix}/imports`]: "error",
    ...rulesConfig,
  } as Record<string, RuleEntry>,
});

const nextRules = (rulesConfig: RulesConfig, nextPrefix: string) => ({
  plugins: { [nextPrefix]: fixupPluginRules(next) },
  rules: {
    ...renameRules(next.configs.recommended.rules, "@next/next", nextPrefix),
    ...rulesConfig,
  },
});

const securityRules = (rulesConfig: RulesConfig, securityPrefix: string) => ({
  plugins: { [securityPrefix]: security },
  rules: {
    ...renameRules(
      security.configs.recommended.rules,
      "security",
      securityPrefix,
    ),
    ...rulesConfig,
  },
});

const promiseRules = (rulesConfig: RulesConfig, promisePrefix: string) => ({
  plugins: { [promisePrefix]: promise },
  rules: {
    ...renameRules(
      promise.configs["flat/recommended"].rules,
      "promise",
      promisePrefix,
    ),
    [`${promisePrefix}/always-return`]: "off",
    [`${promisePrefix}/catch-or-return`]: "off",
    ...rulesConfig,
  },
});

const importRules = (rulesConfig: RulesConfig, importPrefix: string) => ({
  plugins: { [importPrefix]: importX },
  rules: {
    ...renameRules(importX.configs.recommended.rules, "import-x", importPrefix),
    ...rulesConfig,
  },
});

const javascriptRules = (rulesConfig: RulesConfig = {}) =>
  rulesConfig
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
/* eslint "max-lines": "off" -- Will split file up later */

const eslintCommentsRules = (
  rulesConfig: RulesConfig,
  commentsPrefix: string,
) => ({
  plugins: {
    [commentsPrefix]: fixupPluginRules(eslintComments),
  },
  rules: {
    ...renameRules(
      eslintComments.configs.recommended.rules,
      "eslint-comments",
      commentsPrefix,
    ),
    [`${commentsPrefix}/require-description`]: "error",
    [`${commentsPrefix}/no-unused-disable`]: "error",
    ...rulesConfig,
  },
});

const typescriptRules = (rulesConfig: RulesConfig, typescriptPrefix: string) =>
  rulesConfig
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
      ].map((typescriptConfig) =>
        // @ts-expect-error -- Will deal with this later
        renameRulesTypeScript(typescriptConfig, typescriptPrefix),
      )
    : [];

const prettierRules = (
  rulesConfig: RulesConfig,
  prettierPrefix: string,
): FlatConfig => ({
  plugins: { [prettierPrefix]: prettier },
  rules: {
    ...configPrettier.rules,
    [`${prettierPrefix}/prettier`]: ["warn"],
    ...rulesConfig,
  },
});

const functionalRules = (
  rulesConfig: RulesConfig,
  functionalPrefix: string,
) => ({
  plugins: { [functionalPrefix]: functional },
  rules: {
    ...renameRules(
      // @ts-expect-error -- Can not be undefined
      functional.configs.noMutations.rules,
      "functional",
      functionalPrefix,
    ),
    [`${functionalPrefix}/prefer-immutable-types`]: "off",
    [`${functionalPrefix}/type-declaration-immutability`]: "off",
    ...rulesConfig,
  },
});

const regexpRules = (rulesConfig: RulesConfig, regexpPrefix: string) => ({
  plugins: { [regexpPrefix]: regexp },
  rules: {
    ...renameRules(regexp.configs["flat/all"].rules, "regexp", regexpPrefix),
    ...rulesConfig,
  },
});

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
  | "reactHooks"
  | "jsxA11y"
  | "security"
  | "eslintComments"
  | "typescript"
  | "prettier"
  | "functional"
  | "regexp";

const nikitarevenco = (
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
    javascriptOverride = {},
    reactOverride = {},
    unicornOverride = {},
    sonarjsOverride = {},
    tailwindcssOverride = {},
    importSortOverride = {},
    nextjsOverride = {},
    securityOverride = {},
    promiseOverride = {},
    importxOverride = {},
    reactHooksOverride = {},
    jsxA11yOverride = {},
    eslintCommentsOverride = {},
    typescriptOverride = {},
    prettierOverride = {},
    functionalOverride = {},
    regexpOverride = {},
  }: Partial<Record<`${ConfigItem}Override`, RulesConfig>> = {},
  ...additionalEslintConfigs: Linter.Config[]
) => {
  const renamedRules = { ...newRuleNames, ...renames };

  return typescript.config(
    javascriptRules(javascriptOverride),
    reactRules(reactOverride, renamedRules.react),
    reactHooksRules(reactHooksOverride, renamedRules["react-hooks"]),
    jsxA11yRules(jsxA11yOverride, renamedRules["jsx-a11y"]),
    unicornRules(unicornOverride, renamedRules.unicorn),
    sonarRules(sonarjsOverride, renamedRules.sonarjs),
    tailwindRules(tailwindcssOverride, renamedRules.tailwindcss),
    importSortRules(importSortOverride, renamedRules["simple-import-sort"]),
    nextRules(nextjsOverride, renamedRules["@next/next"]),
    securityRules(securityOverride, renamedRules.security),
    promiseRules(promiseOverride, renamedRules.promise),
    importRules(importxOverride, renamedRules["import-x"]),
    ...typescriptRules(typescriptOverride, renamedRules["@typescript-eslint"]),
    eslintCommentsRules(
      eslintCommentsOverride,
      renamedRules["eslint-comments"],
    ),
    prettierRules(prettierOverride, renamedRules.prettier),
    functionalRules(functionalOverride, renamedRules.functional),
    regexpRules(regexpOverride, renamedRules.regexp),
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
    ...additionalEslintConfigs,
  );
};

export default nikitarevenco;
