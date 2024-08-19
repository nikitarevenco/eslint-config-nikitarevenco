import importX from "eslint-plugin-import-x";

import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const importRules = (
  rulesConfig: RulesConfig,
  importPrefix: string,
) => ({
  plugins: { [importPrefix]: importX },
  rules: {
    ...renameRules(importX.configs.recommended.rules, "import-x", importPrefix),
    ...rulesConfig,
  } as RulesRecord,
});
