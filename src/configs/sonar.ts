import sonar from "eslint-plugin-sonarjs";

import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const sonarRules = (rulesConfig: RulesConfig, sonarPrefix: string) => ({
  plugins: { [sonarPrefix]: sonar },
  rules: {
    // @ts-expect-error -- Will refactor later
    ...renameRules(sonar.configs.recommended.rules, "sonarjs", sonarPrefix),
    ...rulesConfig,
  } as RulesRecord,
});
