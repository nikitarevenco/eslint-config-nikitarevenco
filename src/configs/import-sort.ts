import simpleImportSort from "eslint-plugin-simple-import-sort";

import { type RulesConfig, type RulesRecord } from "../types.js";

export const importSortRules = (
  rulesConfig: RulesConfig,
  importSortPrefix: string,
) => ({
  plugins: { [importSortPrefix]: simpleImportSort },
  rules: {
    [`${importSortPrefix}/exports`]: "error",
    [`${importSortPrefix}/imports`]: "error",
    ...rulesConfig,
  } as RulesRecord,
});
