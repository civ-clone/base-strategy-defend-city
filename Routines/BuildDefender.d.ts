import { CityGrowthRegistry } from '@civ-clone/core-city-growth/CityGrowthRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { UnitImprovementRegistry } from '@civ-clone/core-unit-improvement/UnitImprovementRegistry';
import { UnitRegistry } from '@civ-clone/core-unit/UnitRegistry';
import CityBuildAction from '@civ-clone/core-city-build/PlayerActions/CityBuild';
import Priority from '@civ-clone/core-rule/Priority';
import Routine from '@civ-clone/core-strategy/Routine';
export declare class BuildDefender extends Routine {
  #private;
  constructor(
    priority?: Priority,
    unitRegistry?: UnitRegistry,
    unitImprovementRegistry?: UnitImprovementRegistry,
    cityGrowthRegistry?: CityGrowthRegistry,
    ruleRegistry?: RuleRegistry
  );
  attempt(action: CityBuildAction): Promise<boolean>;
}
export default BuildDefender;
