import { fixupPluginRules } from "@eslint/compat";

import { next } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const nextRules = (rulesConfig: RulesConfig, nextPrefix: string) => ({
  plugins: { [nextPrefix]: fixupPluginRules(next) },
  rules: {
    ...renameRules(
      next.configs.recommended.rules as RulesRecord,
      "@next/next",
      nextPrefix,
    ),
    ...rulesConfig,
  } as RulesRecord,
});
