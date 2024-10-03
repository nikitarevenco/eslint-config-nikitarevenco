import { type Linter } from "eslint";
import typescript from "typescript-eslint";

import { eslintCommentsRules } from "./src/configs/eslint-comments.js";
import { functionalRules } from "./src/configs/functional.js";
import { importRules } from "./src/configs/import.js";
import { importSortRules } from "./src/configs/import-sort.js";
import { javascriptRules } from "./src/configs/javascript.js";
import { jsxA11yRules } from "./src/configs/jsx-a11y.js";
import { nextRules } from "./src/configs/next-rules.js";
import { prettierRules } from "./src/configs/prettier.js";
import { promiseRules } from "./src/configs/promise.js";
import { reactRules } from "./src/configs/react.js";
import { reactHooksRules } from "./src/configs/react-hooks.js";
import { regexpRules } from "./src/configs/regexp.js";
import { securityRules } from "./src/configs/security.js";
import { sonarRules } from "./src/configs/sonar.js";
import { tailwindRules } from "./src/configs/tailwind.js";
import { typescriptRules } from "./src/configs/typescript.js";
import { unicornRules } from "./src/configs/unicorn.js";
import { GLOB_EXCLUDE } from "./src/globs.js";
import { type OldPrefixes, type RulesConfig } from "./src/types.js";
import { newRuleNames } from "./src/utils.js";

type ConfigItem =
  | "javascript"
  | "react"
  | "unicorn"
  | "sonarjs"
  | "tailwindcss"
  | "importSort"
  | "promise"
  | "nextjs"
  | "importx"
  | "reactHooks"
  | "jsxA11y"
  | "security"
  | "eslintComments"
  | "typescript"
  | "prettier"
  | "functional"
  | "regexp";

const nikitarevenco = (
  {
    project,
    tsconfigRootDir,
    renames,
  }: {
    project: string;
    tsconfigRootDir: string;
    renames?: Record<OldPrefixes, string>;
  },
  {
    javascriptOverride = {},
    reactOverride = {},
    unicornOverride = {},
    sonarjsOverride = {},
    tailwindcssOverride = {},
    importSortOverride = {},
    nextjsOverride = {},
    securityOverride = {},
    promiseOverride = {},
    importxOverride = {},
    reactHooksOverride = {},
    jsxA11yOverride = {},
    eslintCommentsOverride = {},
    typescriptOverride = {},
    prettierOverride = {},
    functionalOverride = {},
    regexpOverride = {},
  }: Partial<Record<`${ConfigItem}Override`, RulesConfig>> = {},
  ...additionalEslintConfigs: Linter.Config[]
) => {
  const renamedRules = { ...newRuleNames, ...renames };

  /* eslint import/no-named-as-default-member: "off" -- Importing from the correct module */
  return typescript.config(
    javascriptRules(javascriptOverride),
    // @ts-ignore
    reactRules(reactOverride, renamedRules.react),
    reactHooksRules(reactHooksOverride, renamedRules["react-hooks"]),
    jsxA11yRules(jsxA11yOverride, renamedRules["jsx-a11y"]),
    unicornRules(unicornOverride, renamedRules.unicorn),
    sonarRules(sonarjsOverride, renamedRules.sonarjs),
    tailwindRules(tailwindcssOverride, renamedRules.tailwindcss),
    importSortRules(importSortOverride, renamedRules["simple-import-sort"]),
    nextRules(nextjsOverride, renamedRules["@next/next"]),
    securityRules(securityOverride, renamedRules.security),
    promiseRules(promiseOverride, renamedRules.promise),
    importRules(importxOverride, renamedRules["import-x"]),
    ...typescriptRules(typescriptOverride, renamedRules["@typescript-eslint"]),
    eslintCommentsRules(
      eslintCommentsOverride,
      renamedRules["eslint-comments"],
    ),
    prettierRules(prettierOverride, renamedRules.prettier),
    functionalRules(functionalOverride, renamedRules.functional),
    regexpRules(regexpOverride, renamedRules.regexp),
    {
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          project: true,
          tsconfigRootDir,
        },
      },
      settings: {
        "import-x/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import-x/resolver": {
          typescript: {
            alwaysTryTypes: true,
            project,
          },
        },
        react: {
          version: "detect",
        },
      },
    },
    {
      ignores: GLOB_EXCLUDE,
    },
    ...additionalEslintConfigs,
  );
};

export default nikitarevenco;
