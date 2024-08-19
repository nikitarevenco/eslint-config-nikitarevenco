import { security } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const securityRules = (
  rulesConfig: RulesConfig,
  securityPrefix: string,
) => ({
  plugins: { [securityPrefix]: security },
  rules: {
    ...renameRules(
      security.configs.recommended.rules as RulesRecord,
      "security",
      securityPrefix,
    ),
    ...rulesConfig,
  } as RulesRecord,
});
