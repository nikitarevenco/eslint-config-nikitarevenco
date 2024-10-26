import { GLOB_SRC } from "../globs.js";
import { security } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const securityRules = (
  rulesConfig: RulesConfig,
  securityPrefix: string,
) => ({
  files: [GLOB_SRC],
  plugins: { [securityPrefix]: security },
  rules: {
    ...renameRules(
      security.configs.recommended.rules,
      "security",
      securityPrefix,
    ),
    [`${securityPrefix}/detect-object-injection`]: "off",
    ...rulesConfig,
  } as RulesRecord,
});
