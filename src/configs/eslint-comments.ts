import { fixupPluginRules } from "@eslint/compat";

import { eslintComments } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const eslintCommentsRules = (
  rulesConfig: RulesConfig,
  commentsPrefix: string,
) => ({
  plugins: {
    [commentsPrefix]: fixupPluginRules(eslintComments),
  },
  rules: {
    ...renameRules(
      eslintComments.configs.recommended.rules as RulesRecord,
      "eslint-comments",
      commentsPrefix,
    ),
    [`${commentsPrefix}/require-description`]: "error",
    [`${commentsPrefix}/no-unused-disable`]: "error",
    ...rulesConfig,
  } as RulesRecord,
});
