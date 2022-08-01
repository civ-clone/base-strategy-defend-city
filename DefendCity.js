"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefendCity = void 0;
const BuildDefender_1 = require("./Routines/BuildDefender");
const FortifyDefender_1 = require("./Routines/FortifyDefender");
const Strategy_1 = require("@civ-clone/core-strategy/Strategy");
class DefendCity extends Strategy_1.default {
    constructor() {
        super(new BuildDefender_1.default(), new FortifyDefender_1.default());
    }
}
exports.DefendCity = DefendCity;
exports.default = DefendCity;
//# sourceMappingURL=DefendCity.js.map