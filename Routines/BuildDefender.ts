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
import BuildItem from '@civ-clone/core-city-build/BuildItem';
import CityBuild from '@civ-clone/core-city-build/CityBuild';
import CityBuildAction from '@civ-clone/core-city-build/PlayerActions/CityBuild';
import High from '@civ-clone/core-rule/Priorities/High';
import Priority from '@civ-clone/core-rule/Priority';
import Routine from '@civ-clone/core-strategy/Routine';
import Unit from '@civ-clone/core-unit/Unit';
import { getUnitTypeDefence, isDefended, isDefender } from '../lib/isDefender';

export class BuildDefender extends Routine {
  #unitImprovementRegistry: UnitImprovementRegistry;
  #unitRegistry: UnitRegistry;
  #cityGrowthRegistry: CityGrowthRegistry;
  #ruleRegistry: RuleRegistry;

  constructor(
    priority: Priority = new High(),
    unitRegistry: UnitRegistry = unitRegistryInstance,
    unitImprovementRegistry: UnitImprovementRegistry = unitImprovementRegistryInstance,
    cityGrowthRegistry: CityGrowthRegistry = cityGrowthRegistryInstance,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(CityBuildAction, priority);

    this.#unitImprovementRegistry = unitImprovementRegistry;
    this.#unitRegistry = unitRegistry;
    this.#cityGrowthRegistry = cityGrowthRegistry;
    this.#ruleRegistry = ruleRegistry;
  }

  attempt(action: CityBuildAction): Promise<boolean> {
    return new Promise((resolve) => {
      const cityBuild: CityBuild = action.value(),
        city = cityBuild.city(),
        tileUnits = this.#unitRegistry.getByTile(city.tile()),
        defendingUnits = tileUnits.filter((tileUnit) => isDefender(tileUnit)),
        cityGrowth = this.#cityGrowthRegistry.getByCity(city);

      if (isDefended(defendingUnits.length, cityGrowth.size())) {
        resolve(false);

        return;
      }

      const [defender] = cityBuild
        .available()
        .filter((buildItem: BuildItem) => {
          if (!Object.prototype.isPrototypeOf.call(Unit, buildItem)) {
            resolve(false);

            return;
          }

          const defence = getUnitTypeDefence(
            buildItem.item() as unknown as typeof Unit,
            this.#ruleRegistry
          );

          return defence > 0;
        })
        .sort(
          (a, b) =>
            getUnitTypeDefence(
              b.item() as unknown as typeof Unit,
              this.#ruleRegistry
            ) -
            getUnitTypeDefence(
              b.item() as unknown as typeof Unit,
              this.#ruleRegistry
            )
        );

      if (!defender) {
        resolve(false);

        return;
      }

      cityBuild.build(defender.item());

      resolve(true);
    });
  }
}

export default BuildDefender;
