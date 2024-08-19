import { promise } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const promiseRules = (
  rulesConfig: RulesConfig,
  promisePrefix: string,
) => ({
  plugins: { [promisePrefix]: promise },
  rules: {
    ...renameRules(
      promise.configs["flat/recommended"].rules as RulesRecord,
      "promise",
      promisePrefix,
    ),
    [`${promisePrefix}/always-return`]: "off",
    [`${promisePrefix}/catch-or-return`]: "off",
    ...rulesConfig,
  } as RulesRecord,
});
