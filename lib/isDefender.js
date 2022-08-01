"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefended = exports.isDefender = exports.isFortified = exports.getUnitDefence = exports.getUnitTypeDefence = void 0;
const Yield_1 = require("@civ-clone/core-unit/Rules/Yield");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const UnitImprovementRegistry_1 = require("@civ-clone/core-unit-improvement/UnitImprovementRegistry");
const Defence_1 = require("@civ-clone/core-unit/Yields/Defence");
const Fortified_1 = require("@civ-clone/base-unit-improvement-fortified/UnitImprovements/Fortified");
const defenceMap = new Map();
const getUnitTypeDefence = (unit, ruleRegistry = RuleRegistry_1.instance) => {
    const existing = defenceMap.get(unit);
    if (typeof existing !== 'undefined') {
        return existing;
    }
    const defence = new Defence_1.default();
    ruleRegistry.process(Yield_1.BaseYield, unit, defence);
    defenceMap.set(unit, defence.value());
    return defence.value();
};
exports.getUnitTypeDefence = getUnitTypeDefence;
const getUnitDefence = (unit, ruleRegistry = RuleRegistry_1.instance) => {
    const existing = defenceMap.get(unit);
    if (typeof existing !== 'undefined') {
        return existing;
    }
    const defence = new Defence_1.default();
    ruleRegistry.process(Yield_1.Yield, unit, defence);
    defenceMap.set(unit, defence.value());
    return defence.value();
};
exports.getUnitDefence = getUnitDefence;
const isFortified = (unit, unitImprovementRegistry = UnitImprovementRegistry_1.instance) => unitImprovementRegistry
    .getByUnit(unit)
    .some((improvement) => improvement instanceof Fortified_1.default);
exports.isFortified = isFortified;
const isDefender = (unit, ruleRegistry = RuleRegistry_1.instance) => (0, exports.getUnitDefence)(unit, ruleRegistry) > 0 && (0, exports.isFortified)(unit);
exports.isDefender = isDefender;
// TODO: This value should probably be determined by the AI's "fear" of being attacked or desire to protect
//  the particular city (capital, has wonders, etc)
//  Should be controlled by rules...
const isDefended = (defendingUnits, citySize) => defendingUnits >= Math.max(Math.ceil(citySize / 4), 2);
exports.isDefended = isDefended;
//# sourceMappingURL=isDefender.js.map