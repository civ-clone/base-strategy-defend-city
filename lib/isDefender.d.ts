import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { UnitImprovementRegistry } from '@civ-clone/core-unit-improvement/UnitImprovementRegistry';
import Unit from '@civ-clone/core-unit/Unit';
export declare const getUnitTypeDefence: (
  unit: typeof Unit,
  ruleRegistry?: RuleRegistry
) => number;
export declare const getUnitDefence: (
  unit: Unit,
  ruleRegistry?: RuleRegistry
) => number;
export declare const isFortified: (
  unit: Unit,
  unitImprovementRegistry?: UnitImprovementRegistry
) => boolean;
export declare const isDefender: (
  unit: Unit,
  ruleRegistry?: RuleRegistry
) => boolean;
export declare const isDefended: (
  defendingUnits: number,
  citySize: number
) => boolean;
