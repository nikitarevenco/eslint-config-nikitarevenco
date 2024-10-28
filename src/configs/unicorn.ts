import unicorn from "eslint-plugin-unicorn";

import { GLOB_SRC } from "../globs.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const unicornRules = (
  rulesConfig: RulesConfig,
  unicornPrefix: string,
) =>
  rulesConfig
    ? {
        files: [GLOB_SRC],
        plugins: { [unicornPrefix]: unicorn },
        rules: {
          ...renameRules(
            // @ts-expect-error -- Will refactor later
            unicorn.configs["flat/all"].rules,
            "unicorn",
            unicornPrefix,
          ),
          [`${unicornPrefix}/no-array-reduce`]: "off",
          [`${unicornPrefix}/prefer-query-selector`]: "off",
          [`${unicornPrefix}/no-keyword-prefix`]: "off",
          [`${unicornPrefix}/no-null`]: "off",
          [`${unicornPrefix}/prefer-at`]: [
            "error",
          ],
          [`${unicornPrefix}/prevent-abbreviations`]: "off",
          ...rulesConfig,
        } as RulesRecord,
      }
    : {};
