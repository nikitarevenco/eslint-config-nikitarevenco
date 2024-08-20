import typescript from "typescript-eslint";

import { GLOB_SRC } from "../globs.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRulesTypeScript } from "../utils.js";

export const typescriptRules = (
  rulesConfig: RulesConfig,
  typescriptPrefix: string,
) =>
  rulesConfig
    ? [
        /* eslint import/no-named-as-default-member: "off" -- the name should not be changed, we are importing from the correct place */
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
          } as RulesRecord,
        },
      ]
        .map((typescriptConfig) =>
          // @ts-expect-error -- Will deal with this later
          renameRulesTypeScript(typescriptConfig, typescriptPrefix),
        )
        .map((typescriptConfig) => ({ ...typescriptConfig, files: [GLOB_SRC] }))
    : [];
