import regexp from "eslint-plugin-regexp";

import { GLOB_SRC } from "../globs.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const regexpRules = (
  rulesConfig: RulesConfig,
  regexpPrefix: string,
) => ({
  files: [GLOB_SRC],
  plugins: { [regexpPrefix]: regexp },
  rules: {
    /* eslint import/no-named-as-default-member: "off" -- Importing from the correct module */
    ...renameRules(regexp.configs["flat/all"].rules, "regexp", regexpPrefix),
    ...rulesConfig,
  } as RulesRecord,
});
