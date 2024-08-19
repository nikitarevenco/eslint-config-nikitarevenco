import { type FlatConfig } from "@eslint/compat";
import prettier from "eslint-plugin-prettier";

import { configPrettier } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";

export const prettierRules = (
  rulesConfig: RulesConfig,
  prettierPrefix: string,
): FlatConfig => ({
  plugins: { [prettierPrefix]: prettier },
  rules: {
    ...configPrettier.rules,
    [`${prettierPrefix}/prettier`]: ["warn"],
    ...rulesConfig,
  } as RulesRecord,
});
