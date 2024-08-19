import functional from "eslint-plugin-functional";

import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const functionalRules = (
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
  } as RulesRecord,
});
