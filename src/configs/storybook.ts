import { GLOB_SRC } from "../globs.js";
import { storybook } from "../stub.js";
import { type RulesConfig } from "../types.js";
import { renameRulesArray } from "../utils.js";

export const storybookRules = (
  rulesConfig: RulesConfig,
  storybookPrefix: string,
) =>
  rulesConfig
    ? [
        /* eslint import/no-named-as-default-member: "off" -- the name should not be changed, we are importing from the correct place */
        ...storybook.configs["flat/recommended"],
        {
          rules: {
            [`${storybookPrefix}/default-exports`]: "off",
          },
        },
      ]
        .map((storybookConfig) =>
          renameRulesArray(
            // @ts-expect-error -- Satisfies Config
            storybookConfig,
            "storybook",
            storybookPrefix,
          ),
        )
        .map((storybookConfig) => ({ ...storybookConfig, files: [GLOB_SRC] }))
    : [];
