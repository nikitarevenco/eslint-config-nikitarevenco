import { GLOB_SRC } from "../globs.js";
import { pluginImport } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const importRules = (
  rulesConfig: RulesConfig,
  importPrefix: string,
) => ({
  files: [GLOB_SRC],
  plugins: { [importPrefix]: pluginImport },
  rules: {
    ...renameRules(
      pluginImport.configs.recommended.rules,
      "import",
      importPrefix,
    ),
    ...rulesConfig,
  } as RulesRecord,
});
