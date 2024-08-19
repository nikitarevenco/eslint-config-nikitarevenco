import { fixupPluginRules } from "@eslint/compat";

import { reactHooks } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const reactHooksRules = (
  rulesConfig: RulesConfig,
  reactHooksPrefix: string,
) => ({
  plugins: {
    /* eslint ts/no-unsafe-argument: "off" -- Module has no type declarations */
    [reactHooksPrefix]: fixupPluginRules(reactHooks),
  },
  rules: {
    ...renameRules(
      reactHooks.configs.recommended.rules,
      "react-hooks",
      reactHooksPrefix,
    ),
    ...rulesConfig,
  } as RulesRecord,
});
