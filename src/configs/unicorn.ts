import unicorn from "eslint-plugin-unicorn";

import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const unicornRules = (
  rulesConfig: RulesConfig,
  unicornPrefix: string,
) =>
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
        } as RulesRecord,
      }
    : {};