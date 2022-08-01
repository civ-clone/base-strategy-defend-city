"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BuildDefender_unitImprovementRegistry, _BuildDefender_unitRegistry, _BuildDefender_cityGrowthRegistry, _BuildDefender_ruleRegistry;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildDefender = void 0;
const CityGrowthRegistry_1 = require("@civ-clone/core-city-growth/CityGrowthRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const UnitImprovementRegistry_1 = require("@civ-clone/core-unit-improvement/UnitImprovementRegistry");
const UnitRegistry_1 = require("@civ-clone/core-unit/UnitRegistry");
const CityBuild_1 = require("@civ-clone/core-city-build/PlayerActions/CityBuild");
const High_1 = require("@civ-clone/core-rule/Priorities/High");
const Routine_1 = require("@civ-clone/core-strategy/Routine");
const Unit_1 = require("@civ-clone/core-unit/Unit");
const isDefender_1 = require("../lib/isDefender");
class BuildDefender extends Routine_1.default {
    constructor(priority = new High_1.default(), unitRegistry = UnitRegistry_1.instance, unitImprovementRegistry = UnitImprovementRegistry_1.instance, cityGrowthRegistry = CityGrowthRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance) {
        super(CityBuild_1.default, priority);
        _BuildDefender_unitImprovementRegistry.set(this, void 0);
        _BuildDefender_unitRegistry.set(this, void 0);
        _BuildDefender_cityGrowthRegistry.set(this, void 0);
        _BuildDefender_ruleRegistry.set(this, void 0);
        __classPrivateFieldSet(this, _BuildDefender_unitImprovementRegistry, unitImprovementRegistry, "f");
        __classPrivateFieldSet(this, _BuildDefender_unitRegistry, unitRegistry, "f");
        __classPrivateFieldSet(this, _BuildDefender_cityGrowthRegistry, cityGrowthRegistry, "f");
        __classPrivateFieldSet(this, _BuildDefender_ruleRegistry, ruleRegistry, "f");
    }
    attempt(action) {
        return new Promise((resolve) => {
            const cityBuild = action.value(), city = cityBuild.city(), tileUnits = __classPrivateFieldGet(this, _BuildDefender_unitRegistry, "f").getByTile(city.tile()), defendingUnits = tileUnits.filter((tileUnit) => (0, isDefender_1.isDefender)(tileUnit)), cityGrowth = __classPrivateFieldGet(this, _BuildDefender_cityGrowthRegistry, "f").getByCity(city);
            if ((0, isDefender_1.isDefended)(defendingUnits.length, cityGrowth.size())) {
                resolve(false);
                return;
            }
            const [defender] = cityBuild
                .available()
                .filter((buildItem) => {
                if (!Object.prototype.isPrototypeOf.call(Unit_1.default, buildItem)) {
                    resolve(false);
                    return;
                }
                const defence = (0, isDefender_1.getUnitTypeDefence)(buildItem.item(), __classPrivateFieldGet(this, _BuildDefender_ruleRegistry, "f"));
                return defence > 0;
            })
                .sort((a, b) => (0, isDefender_1.getUnitTypeDefence)(b.item(), __classPrivateFieldGet(this, _BuildDefender_ruleRegistry, "f")) -
                (0, isDefender_1.getUnitTypeDefence)(b.item(), __classPrivateFieldGet(this, _BuildDefender_ruleRegistry, "f")));
            if (!defender) {
                resolve(false);
                return;
            }
            cityBuild.build(defender.item());
            resolve(true);
        });
    }
}
exports.BuildDefender = BuildDefender;
_BuildDefender_unitImprovementRegistry = new WeakMap(), _BuildDefender_unitRegistry = new WeakMap(), _BuildDefender_cityGrowthRegistry = new WeakMap(), _BuildDefender_ruleRegistry = new WeakMap();
exports.default = BuildDefender;
//# sourceMappingURL=BuildDefender.js.map