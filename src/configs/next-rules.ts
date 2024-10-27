import { fixupPluginRules } from "@eslint/compat";

import { GLOB_SRC } from "../globs.js";
import { next } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const nextRules = (rulesConfig: RulesConfig, nextPrefix: string) => ({
  files: [GLOB_SRC],
  plugins: { [nextPrefix]: fixupPluginRules(next) },
  rules: {
    ...renameRules(next.configs.recommended.rules, "@next/next", nextPrefix),
    [`${nextPrefix}/no-img-element`]: ["off"],
    ...rulesConfig,
  } as RulesRecord,
});
