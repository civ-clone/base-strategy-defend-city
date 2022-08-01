import {
  BaseYield,
  IBaseYieldRegistry,
  Yield,
  IYieldRegistry,
} from '@civ-clone/core-unit/Rules/Yield';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import {
  UnitImprovementRegistry,
  instance as unitImprovementRegistryInstance,
} from '@civ-clone/core-unit-improvement/UnitImprovementRegistry';
import Defence from '@civ-clone/core-unit/Yields/Defence';
import Fortified from '@civ-clone/base-unit-improvement-fortified/UnitImprovements/Fortified';
import Unit from '@civ-clone/core-unit/Unit';

const defenceMap = new Map<typeof Unit | Unit, number>();

export const getUnitTypeDefence = (
  unit: typeof Unit,
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): number => {
  const existing = defenceMap.get(unit);

  if (typeof existing !== 'undefined') {
    return existing;
  }

  const defence = new Defence();

  (ruleRegistry as IBaseYieldRegistry).process(BaseYield, unit, defence);

  defenceMap.set(unit, defence.value());

  return defence.value();
};

export const getUnitDefence = (
  unit: Unit,
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): number => {
  const existing = defenceMap.get(unit);

  if (typeof existing !== 'undefined') {
    return existing;
  }

  const defence = new Defence();

  (ruleRegistry as IYieldRegistry).process(Yield, unit, defence);

  defenceMap.set(unit, defence.value());

  return defence.value();
};

export const isFortified = (
  unit: Unit,
  unitImprovementRegistry: UnitImprovementRegistry = unitImprovementRegistryInstance
): boolean =>
  unitImprovementRegistry
    .getByUnit(unit)
    .some((improvement) => improvement instanceof Fortified);

export const isDefender = (
  unit: Unit,
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): boolean => getUnitDefence(unit, ruleRegistry) > 0 && isFortified(unit);

// TODO: This value should probably be determined by the AI's "fear" of being attacked or desire to protect
//  the particular city (capital, has wonders, etc)
//  Should be controlled by rules...
export const isDefended = (defendingUnits: number, citySize: number): boolean =>
  defendingUnits >= Math.max(Math.ceil(citySize / 4), 2);
