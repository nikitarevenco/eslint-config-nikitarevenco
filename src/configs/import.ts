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
    // Is currently bugged and will flag typescript path aliases as unresolved imports
    [`${importPrefix}/no-unresolved`]: "off",
    ...rulesConfig,
  } as RulesRecord,
});
