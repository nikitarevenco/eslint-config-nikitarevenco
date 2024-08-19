import { fixupPluginRules } from "@eslint/compat";

// @ts-ignore
import jsxA11y from "eslint-plugin-jsx-a11y";
// @ts-ignore
import react from "eslint-plugin-react";
// @ts-ignore
import reactHooks from "eslint-plugin-react-hooks";

const reactRules = (() => {
  return {
    plugins: {
      "jsx-a11y": jsxA11y,
      react: react,
      "react-hooks": fixupPluginRules(reactHooks),
    },
    rules: {
      ...jsxA11y.flatConfigs.strict.rules,
      ...react.configs.flat.all.rules,
      ...reactHooks.configs.recommended.rules,
      "react/forbid-component-props": "off",
      "react/jsx-filename-extension": [
        "error",
        { extensions: [".jsx", ".tsx"] },
      ],
      "react/jsx-max-depth": "off",
      "react/jsx-no-bind": ["error", { allowArrowFunctions: true }],
      "react/jsx-no-constructed-context-values": "off",
      "react/jsx-no-leaked-render": "off",
      "react/jsx-no-literals": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-sort-props": "off",
      "react/no-multi-comp": "off",
      "react/no-unescaped-entities": "off",
      "react/prop-types": ["error", { ignore: ["className"] }],
      "react/react-in-jsx-scope": "off",
      "react/require-default-props": "off",
    },
  };
})();

import unicorn from "eslint-plugin-unicorn";

const unicornRules = (() => {
  return {
    plugins: { unicorn: unicorn },
    rules: {
      ...unicorn.configs["flat/all"].rules,
      "unicorn/no-array-reduce": "off",
      "unicorn/no-keyword-prefix": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-at": ["error", { checkAllIndexAccess: true }],
      "unicorn/prevent-abbreviations": "off",
    },
  };
})();

import sonar from "eslint-plugin-sonarjs";

const sonarRules = (() => {
  return {
    plugins: { sonarjs: sonar },
    rules: {
      ...sonar.configs.recommended.rules,
    },
  };
})();

// @ts-ignore
import tailwindcss from "eslint-plugin-tailwindcss";
const tailwindRules = (() => {
  return {
    plugins: { tailwindcss },
    rules: {
      "tailwindcss/enforces-negative-arbitrary-values": "error",
      "tailwindcss/enforces-shorthand": "error",
      "tailwindcss/no-contradicting-classname": "error",
      "tailwindcss/no-unnecessary-arbitrary-value": "error",
    },
  };
})();

import simpleImportSort from "eslint-plugin-simple-import-sort";
const importSortRules = (() => {
  return {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
    },
  };
})();

const rules = [
  reactRules,
  unicornRules,
  sonarRules,
  tailwindRules,
  importSortRules,
];

module.exports = rules;
