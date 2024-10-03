import react, { configs } from "eslint-plugin-react";

import { GLOB_SRC } from "../globs.js";
import { type RulesConfig, type RulesRecord } from "../types.js";
import { renameRules } from "../utils.js";

export const reactRules = (rulesConfig: RulesConfig, reactPrefix: string) => ({
  files: [GLOB_SRC],
  plugins: {
    [reactPrefix]: react,
  },
  rules: {
    ...renameRules(configs.flat.all.rules, "react", reactPrefix),
    [`${reactPrefix}/forbid-component-props`]: "off",
    [`${reactPrefix}/jsx-filename-extension`]: [
      "error",
      { extensions: [".jsx", ".tsx"] },
    ],
    [`${reactPrefix}/jsx-max-depth`]: "off",
    [`${reactPrefix}/jsx-no-bind`]: ["error", { allowArrowFunctions: true }],
    [`${reactPrefix}/jsx-no-constructed-context-values`]: "off",
    [`${reactPrefix}/jsx-no-leaked-render`]: "off",
    [`${reactPrefix}/jsx-no-literals`]: "off",
    [`${reactPrefix}/jsx-props-no-spreading`]: "off",
    [`${reactPrefix}/jsx-sort-props`]: "off",
    [`${reactPrefix}/no-multi-comp`]: "off",
    [`${reactPrefix}/no-unescaped-entities`]: "off",
    [`${reactPrefix}/prop-types`]: "off",
    [`${reactPrefix}/prefer-read-only-props`]: "off",
    [`${reactPrefix}/react-in-jsx-scope`]: "off",
    [`${reactPrefix}/require-default-props`]: "off",
    ...rulesConfig,
  } as RulesRecord,
});
