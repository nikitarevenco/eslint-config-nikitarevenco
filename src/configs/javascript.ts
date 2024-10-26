import { GLOB_SRC } from "../globs.js";
import { javascript } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";

export const javascriptRules = (rulesConfig: RulesConfig = {}) =>
  rulesConfig
    ? {
        files: [GLOB_SRC],
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
          "no-undefined": "off",
          "no-ternary": "off",
          "no-underscore-dangle": "off",
          "no-unused-expressions": "off",
          // does not account for the variable being used as a React component, superceded by @typescript-eslint/no-unused-vars
          "no-useless-assignment": "off",
          "no-void": ["error", { allowAsStatement: true }],
          "one-var": ["error", "never"],
          ...rulesConfig,
        } as RulesRecord,
      }
    : {};
