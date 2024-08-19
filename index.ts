const rule = [
  "error",
  {
    argsIgnorePattern: "^_$",
    varsIgnorePattern: "^_$",
    caughtErrorsIgnorePattern: "^_$",
  },
] as any;

module.exports = rule;
