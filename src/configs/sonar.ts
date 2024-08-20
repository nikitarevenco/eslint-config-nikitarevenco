import sonar from "eslint-plugin-sonarjs";

import { GLOB_SRC } from "../globs.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const sonarRules = (rulesConfig: RulesConfig, sonarPrefix: string) => ({
  files: [GLOB_SRC],
  plugins: { [sonarPrefix]: sonar },
  rules: {
    /* eslint import/no-named-as-default-member: "off" -- Importing from the correct module */
    // @ts-expect-error -- Will refactor later
    ...renameRules(sonar.configs.recommended.rules, "sonarjs", sonarPrefix),
    ...rulesConfig,
  } as RulesRecord,
});
