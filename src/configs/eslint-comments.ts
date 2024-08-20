import { fixupPluginRules } from "@eslint/compat";

import { GLOB_SRC } from "../globs.js";
import { eslintComments } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const eslintCommentsRules = (
  rulesConfig: RulesConfig,
  commentsPrefix: string,
) => ({
  files: [GLOB_SRC],
  plugins: {
    [commentsPrefix]: fixupPluginRules(eslintComments),
  },
  rules: {
    ...renameRules(
      eslintComments.configs.recommended.rules,
      "eslint-comments",
      commentsPrefix,
    ),
    [`${commentsPrefix}/require-description`]: "error",
    [`${commentsPrefix}/no-unused-disable`]: "error",
    ...rulesConfig,
  } as RulesRecord,
});
