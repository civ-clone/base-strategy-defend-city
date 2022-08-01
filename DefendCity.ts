import BuildDefender from './Routines/BuildDefender';
import FortifyDefender from './Routines/FortifyDefender';
import Strategy from '@civ-clone/core-strategy/Strategy';

export class DefendCity extends Strategy {
  constructor() {
    super(new BuildDefender(), new FortifyDefender());
  }
}

export default DefendCity;
