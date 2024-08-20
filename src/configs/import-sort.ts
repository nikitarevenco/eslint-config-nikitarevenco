import simpleImportSort from "eslint-plugin-simple-import-sort";

import { GLOB_SRC } from "../globs.js";
import { type RulesConfig, type RulesRecord } from "../types.js";

export const importSortRules = (
  rulesConfig: RulesConfig,
  importSortPrefix: string,
) => ({
  files: [GLOB_SRC],
  plugins: { [importSortPrefix]: simpleImportSort },
  rules: {
    [`${importSortPrefix}/exports`]: "error",
    [`${importSortPrefix}/imports`]: "error",
    ...rulesConfig,
  } as RulesRecord,
});
