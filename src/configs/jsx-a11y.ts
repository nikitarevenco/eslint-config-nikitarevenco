import { jsxA11y } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const jsxA11yRules = (
  rulesConfig: RulesConfig,
  jsxA11yPrefix: string,
) => ({
  plugins: {
    /* eslint ts/no-unsafe-assignment: "off" -- Module has no type declarations */
    [jsxA11yPrefix]: jsxA11y,
  },
  rules: {
    /* eslint ts/no-unsafe-member-access: "off" -- Module has no type declarations */
    ...renameRules(
      jsxA11y.flatConfigs.strict.rules as RulesRecord,
      "jsx-a11y",
      jsxA11yPrefix,
    ),
    ...rulesConfig,
  } as RulesRecord,
});
