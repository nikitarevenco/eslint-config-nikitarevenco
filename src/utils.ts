import { type Linter } from "eslint";

import {
  type GetNewPrefix,
  type OldPrefixes,
  type RulesRecord,
} from "./types.js";

export const newRuleNames = {
  "react-hooks": "hooks",
  "jsx-a11y": "a11y",
  react: "react",
  unicorn: "unicorn",
  sonarjs: "sonar",
  tailwindcss: "tailwind",
  "simple-import-sort": "import-sort",
  "@next/next": "next",
  security: "security",
  promise: "promise",
  "import-x": "import",
  "eslint-comments": "eslint-comments",
  prettier: "prettier",
  functional: "immutable",
  regexp: "regexp",
  "@typescript-eslint": "ts",
} as const;

export const renameRules = <OldPrefix extends OldPrefixes>(
  rules: RulesRecord,
  oldPrefix: OldPrefix,
  newPrefix: string,
) => {
  const replace = `^${oldPrefix}`;
  return Object.fromEntries(
    Object.entries(rules).map(([ruleName, ruleValue]) => [
      ruleName.replace(new RegExp(replace, "u"), newPrefix),
      ruleValue,
    ]),
  ) as RulesRecord<GetNewPrefix<OldPrefix>>;
};

export const renameRulesTypeScript = (
  tsConfig: Linter.Config<RulesRecord<"@typescript-eslint">>,
  newPrefix: string,
): Linter.Config<RulesRecord<GetNewPrefix<"@typescript-eslint">>> =>
  Object.fromEntries(
    (
      Object.entries(tsConfig) as Array<
        [
          keyof Linter.Config<RulesRecord<"@typescript-eslint">>,
          Linter.Config<RulesRecord<"@typescript-eslint">>[keyof Linter.Config<
            RulesRecord<"@typescript-eslint">
          >],
        ]
      >
    ).map(([key, value]) => {
      const newValue =
        /* eslint sonar/no-duplicate-string: "off" -- Would not make the code cleaner if we had defined a constant for it */
        key === "rules"
          ? /* eslint no-inline-comments: "off" -- Auto fixes to add an inline comment, will fix later */
            // @ts-expect-error -- Will error otherwise
            renameRules(value, "@typescript-eslint", newPrefix)
          : value;

      return [
        key,
        // @ts-expect-error -- Will error otherwise
        key === "plugins" && "@typescript-eslint" in value
          ? Object.fromEntries(
              Object.entries(value).map(([pluginName, pluginValue]) => [
                pluginName === "@typescript-eslint"
                  ? newRuleNames["@typescript-eslint"]
                  : pluginName,
                pluginValue,
              ]),
            )
          : newValue,
      ];
    }),
  );
