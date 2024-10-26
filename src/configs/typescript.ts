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
            [`${typescriptPrefix}/array-type`]: [
              "error",
              { default: "array-simple", readonly: "array-simple" },
            ],
            [`${typescriptPrefix}/naming-convention`]: [
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
              // unused function parameters must begin with an underscore
              {
                selector: ["parameter"],
                modifiers: ["unused"],
                format: ["camelCase"],
                prefix: ["_"],
              },
              // Required prefix for boolean variables
              {
                selector: "variable",
                types: ["boolean"],
                format: ["PascalCase"],
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
            [`${typescriptPrefix}/class-methods-use-this`]: "error",
            [`${typescriptPrefix}/consistent-type-definitions`]: [
              "error",
              "type",
            ],
            [`${typescriptPrefix}/consistent-type-imports`]: [
              "error",
              {
                fixStyle: "inline-type-imports",
                prefer: "type-imports",
              },
            ],
            [`${typescriptPrefix}/consistent-type-exports`]: "error",
            [`${typescriptPrefix}/default-param-last`]: "error",
            [`${typescriptPrefix}/init-declarations`]: "error",
            [`${typescriptPrefix}/no-loop-func`]: "error",
            [`${typescriptPrefix}/max-params`]: "error",
            [`${typescriptPrefix}/no-empty-function`]: "off",
            [`${typescriptPrefix}/no-explicit-any`]: [
              "error",
              { fixToUnknown: true },
            ],
            [`${typescriptPrefix}/no-shadow`]: "error",
            [`${typescriptPrefix}/no-use-before-define`]: "error",
            [`${typescriptPrefix}/no-useless-empty-export`]: "error",
            [`${typescriptPrefix}/parameter-properties`]: "error",
            [`${typescriptPrefix}/no-unnecessary-parameter-property-assignment`]:
              "error",
            [`${typescriptPrefix}/prefer-destructuring`]: "error",
            [`${typescriptPrefix}/promise-function-async`]: "error",
            [`${typescriptPrefix}/no-unnecessary-qualifier`]: "error",
            [`${typescriptPrefix}/no-unused-vars`]: [
              "error",
              {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
              },
            ],
            [`${typescriptPrefix}/restrict-template-expressions`]: [
              "error",
              {
                allowBoolean: true,
                allowNullish: true,
                allowNumber: true,
                allowRegExp: true,
              },
            ],
            [`${typescriptPrefix}/switch-exhaustiveness-check`]: [
              "error",
              { requireDefaultForNonUnion: true },
            ],
            ...rulesConfig,
          } as RulesRecord,
        },
      ]
        .map((typescriptConfig) =>
          // @ts-expect-error -- Satisfies Config
          renameRulesTypeScript(typescriptConfig, typescriptPrefix),
        )
        .map((typescriptConfig) => ({ ...typescriptConfig, files: [GLOB_SRC] }))
    : [];
