import { CityGrowthRegistry } from '@civ-clone/core-city-growth/CityGrowthRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { UnitImprovementRegistry } from '@civ-clone/core-unit-improvement/UnitImprovementRegistry';
import { UnitRegistry } from '@civ-clone/core-unit/UnitRegistry';
import ActiveUnit from '@civ-clone/base-player-action-active-unit/ActiveUnit';
import Priority from '@civ-clone/core-rule/Priority';
import Routine from '@civ-clone/core-strategy/Routine';
import { CityRegistry } from '@civ-clone/core-city/CityRegistry';
export declare class FortifyDefender extends Routine {
  #private;
  constructor(
    priority?: Priority,
    cityGrowthRegistry?: CityGrowthRegistry,
    cityRegistry?: CityRegistry,
    ruleRegistry?: RuleRegistry,
    unitImprovementRegistry?: UnitImprovementRegistry,
    unitRegistry?: UnitRegistry
  );
  attempt(action: ActiveUnit): Promise<boolean>;
}
export default FortifyDefender;
