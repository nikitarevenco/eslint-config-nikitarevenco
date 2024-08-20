import importX from "eslint-plugin-import-x";

import { GLOB_SRC } from "../globs.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const importRules = (
  rulesConfig: RulesConfig,
  importPrefix: string,
) => ({
  files: [GLOB_SRC],
  plugins: { [importPrefix]: importX },
  rules: {
    ...renameRules(importX.configs.recommended.rules, "import-x", importPrefix),
    ...rulesConfig,
  } as RulesRecord,
});
