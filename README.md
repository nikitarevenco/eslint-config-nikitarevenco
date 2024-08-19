# eslint-config-nikitarevenco

This is my personal config that I use in all of my projects. It has hundreds of eslint rules and is extremely strict.

## Usage

```ts
import { fixupPluginRules } from "@eslint/compat";
import nikitarevenco from "eslint-config-nikitarevenco";
import typescriptEslint from "typescript-eslint";

const settings = {
  "import/parsers": {
    "@typescript-eslint/parser": [".ts", ".tsx"],
  },
  "import/resolver": {
    typescript: {
      alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      project: "tsconfig.json",
    },
  },
  react: {
    version: "detect",
  },
};

const languageOptions = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: true,
    tsconfigRootDir: import.meta.dirname,
  },
};

const config = [
  ...nikitarevenco(),
  {
    languageOptions,
    settings,
  },
];

export default typescriptEslint.config(...config);
```
