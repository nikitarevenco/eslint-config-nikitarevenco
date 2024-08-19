import regexp from "eslint-plugin-regexp";

import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const regexpRules = (
  rulesConfig: RulesConfig,
  regexpPrefix: string,
) => ({
  plugins: { [regexpPrefix]: regexp },
  rules: {
    ...renameRules(regexp.configs["flat/all"].rules, "regexp", regexpPrefix),
    ...rulesConfig,
  } as RulesRecord,
});
