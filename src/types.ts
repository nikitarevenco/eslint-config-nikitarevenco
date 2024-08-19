import { type Linter } from "eslint";

import { type newRuleNames } from "./utils.js";

export type Overrides = Record<string, unknown>;
export type RulesConfig = Overrides | false;
export type OldPrefixes = keyof typeof newRuleNames;

export type NewPrefixes = (typeof newRuleNames)[OldPrefixes];
export type GetNewPrefix<OldRuleName extends OldPrefixes> =
  (typeof newRuleNames)[OldRuleName];

export type RuleEntry = Linter.RuleEntry<unknown[]>;

export type RulesRecord<Prefix extends NewPrefixes | OldPrefixes | "" = ""> =
  Prefix extends ""
    ? Record<string, RuleEntry>
    : Record<`${Prefix}/${string}`, RuleEntry>;
