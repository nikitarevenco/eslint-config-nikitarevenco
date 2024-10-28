// @ts-expect-error -- No declaration for this module
import _javascript from "@eslint/js";
// @ts-expect-error -- No declaration for this module
import _next from "@next/eslint-plugin-next";
import { type ESLint } from "eslint";
// @ts-expect-error -- No declaration for this module
import _configPrettier from "eslint-config-prettier";
// @ts-expect-error -- No declaration for this module
import _eslintComments from "eslint-plugin-eslint-comments";
// @ts-expect-error -- No declaration for this module
import _import from "eslint-plugin-import";
// @ts-expect-error -- No declaration for this module
import _jsxA11y from "eslint-plugin-jsx-a11y";
// @ts-expect-error -- No declaration for this module
import _promise from "eslint-plugin-promise";
import _react from "eslint-plugin-react";
// @ts-expect-error -- No declaration for this module
import _reactHooks from "eslint-plugin-react-hooks";
// @ts-expect-error -- No declaration for this module
import _security from "eslint-plugin-security";
// @ts-expect-error -- No declaration for this module
import _storybook from "eslint-plugin-storybook";
// @ts-expect-error -- No declaration for this module
import _tailwindcss from "eslint-plugin-tailwindcss";

import { type RulesRecord } from "./types.js";

export const tailwindcss = _tailwindcss as ESLint.Plugin;
export const configPrettier = _configPrettier as ESLint.Plugin;
export const promise = _promise as ESLint.Plugin & {
  configs: {
    ["flat/recommended"]: {
      rules: RulesRecord;
    };
  };
};

export const security = _security as ESLint.Plugin & {
  configs: {
    recommended: {
      rules: RulesRecord;
    };
  };
};
export const jsxA11y = _jsxA11y as ESLint.Plugin & {
  flatConfigs: {
    strict: {
      rules: RulesRecord;
    };
  };
};
export const eslintComments = _eslintComments as ESLint.Plugin & {
  configs: {
    recommended: {
      rules: RulesRecord;
    };
  };
};
export const reactHooks = _reactHooks as ESLint.Plugin & {
  configs: {
    recommended: {
      rules: RulesRecord;
    };
  };
};
export const pluginImport = _import as ESLint.Plugin & {
  configs: {
    recommended: {
      rules: RulesRecord;
    };
  };
};
export const next = _next as ESLint.Plugin & {
  configs: {
    recommended: {
      rules: RulesRecord;
    };
  };
};
export const react = _react as ESLint.Plugin & {
  configs: {
    flat: {
      all: {
        rules: RulesRecord;
      };
    };
  };
};
export const javascript = _javascript as ESLint.Plugin & {
  configs: {
    all: {
      rules: RulesRecord;
    };
  };
};

export const storybook = _storybook as ESLint.Plugin & {
  configs: {
    ["flat/recommended"]: RulesRecord[];
  };
};
