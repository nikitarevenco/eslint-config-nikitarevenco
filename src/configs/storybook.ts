import { GLOB_SRC } from "../globs.js";
import { storybook } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const storybookRules = (
  rulesConfig: RulesConfig,
  storybookPrefix: string,
) => ({
  files: [GLOB_SRC],
  plugins: {
    [storybookPrefix]: storybook,
  },
  rules: {
    ...renameRules(
      storybook.configs["flat/recommended"].rules,
      "jsx-a11y",
      storybookPrefix,
    ),
    ...rulesConfig,
  } as RulesRecord,
});
