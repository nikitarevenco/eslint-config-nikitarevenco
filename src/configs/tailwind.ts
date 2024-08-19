import { tailwindcss } from "../stub.js";
import { type RulesConfig, type RulesRecord } from "../types.js";

export const tailwindRules = (
  rulesConfig: RulesConfig,
  tailwindPrefix: string,
) => ({
  plugins: { [tailwindPrefix]: tailwindcss },
  rules: {
    [`${tailwindPrefix}/enforces-negative-arbitrary-values`]: "error",
    [`${tailwindPrefix}/enforces-shorthand`]: "error",
    [`${tailwindPrefix}/no-contradicting-classname`]: "error",
    [`${tailwindPrefix}/no-unnecessary-arbitrary-value`]: "error",
    ...rulesConfig,
  } as RulesRecord,
});
