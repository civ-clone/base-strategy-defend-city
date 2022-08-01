import {
  CityGrowthRegistry,
  instance as cityGrowthRegistryInstance,
} from '@civ-clone/core-city-growth/CityGrowthRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import {
  UnitImprovementRegistry,
  instance as unitImprovementRegistryInstance,
} from '@civ-clone/core-unit-improvement/UnitImprovementRegistry';
import {
  UnitRegistry,
  instance as unitRegistryInstance,
} from '@civ-clone/core-unit/UnitRegistry';
import ActiveUnit from '@civ-clone/base-player-action-active-unit/ActiveUnit';
import Fortify from '@civ-clone/base-unit-action-fortify/Fortify';
import High from '@civ-clone/core-rule/Priorities/High';
import Priority from '@civ-clone/core-rule/Priority';
import Routine from '@civ-clone/core-strategy/Routine';
import Unit from '@civ-clone/core-unit/Unit';
import { isDefended, isDefender } from '../lib/isDefender';
import {
  CityRegistry,
  instance as cityRegistryInstance,
} from '@civ-clone/core-city/CityRegistry';

export class FortifyDefender extends Routine {
  #cityGrowthRegistry: CityGrowthRegistry;
  #cityRegistry: CityRegistry;
  #ruleRegistry: RuleRegistry;
  #unitRegistry: UnitRegistry;
  #unitImprovementRegistry: UnitImprovementRegistry;

  constructor(
    priority: Priority = new High(),
    cityGrowthRegistry: CityGrowthRegistry = cityGrowthRegistryInstance,
    cityRegistry: CityRegistry = cityRegistryInstance,
    ruleRegistry: RuleRegistry = ruleRegistryInstance,
    unitImprovementRegistry: UnitImprovementRegistry = unitImprovementRegistryInstance,
    unitRegistry: UnitRegistry = unitRegistryInstance
  ) {
    super(ActiveUnit, priority);

    this.#cityRegistry = cityRegistry;
    this.#cityGrowthRegistry = cityGrowthRegistry;
    this.#ruleRegistry = ruleRegistry;
    this.#unitImprovementRegistry = unitImprovementRegistry;
    this.#unitRegistry = unitRegistry;
  }

  attempt(action: ActiveUnit): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const unit: Unit = action.value(),
        [tileCity] = this.#cityRegistry.getByTile(unit.tile());

      if (!tileCity) {
        resolve(false);

        return;
      }

      const defendingUnits = this.#unitRegistry
          .getByTile(tileCity.tile())
          .filter((unit) => isDefender(unit, this.#ruleRegistry)),
        cityGrowth = this.#cityGrowthRegistry.getByCity(tileCity);

      if (isDefended(defendingUnits.length, cityGrowth.size())) {
        resolve(false);

        return;
      }

      const [fortify] = unit
        .actions()
        .filter((action) => action instanceof Fortify);

      if (!fortify) {
        resolve(false);

        return;
      }

      fortify.perform();

      resolve(true);
    });
  }
}

export default FortifyDefender;
