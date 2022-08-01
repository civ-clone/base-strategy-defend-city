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
var _FortifyDefender_cityGrowthRegistry, _FortifyDefender_cityRegistry, _FortifyDefender_ruleRegistry, _FortifyDefender_unitRegistry, _FortifyDefender_unitImprovementRegistry;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortifyDefender = void 0;
const CityGrowthRegistry_1 = require("@civ-clone/core-city-growth/CityGrowthRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const UnitImprovementRegistry_1 = require("@civ-clone/core-unit-improvement/UnitImprovementRegistry");
const UnitRegistry_1 = require("@civ-clone/core-unit/UnitRegistry");
const ActiveUnit_1 = require("@civ-clone/base-player-action-active-unit/ActiveUnit");
const Fortify_1 = require("@civ-clone/base-unit-action-fortify/Fortify");
const High_1 = require("@civ-clone/core-rule/Priorities/High");
const Routine_1 = require("@civ-clone/core-strategy/Routine");
const isDefender_1 = require("../lib/isDefender");
const CityRegistry_1 = require("@civ-clone/core-city/CityRegistry");
class FortifyDefender extends Routine_1.default {
    constructor(priority = new High_1.default(), cityGrowthRegistry = CityGrowthRegistry_1.instance, cityRegistry = CityRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance, unitImprovementRegistry = UnitImprovementRegistry_1.instance, unitRegistry = UnitRegistry_1.instance) {
        super(ActiveUnit_1.default, priority);
        _FortifyDefender_cityGrowthRegistry.set(this, void 0);
        _FortifyDefender_cityRegistry.set(this, void 0);
        _FortifyDefender_ruleRegistry.set(this, void 0);
        _FortifyDefender_unitRegistry.set(this, void 0);
        _FortifyDefender_unitImprovementRegistry.set(this, void 0);
        __classPrivateFieldSet(this, _FortifyDefender_cityRegistry, cityRegistry, "f");
        __classPrivateFieldSet(this, _FortifyDefender_cityGrowthRegistry, cityGrowthRegistry, "f");
        __classPrivateFieldSet(this, _FortifyDefender_ruleRegistry, ruleRegistry, "f");
        __classPrivateFieldSet(this, _FortifyDefender_unitImprovementRegistry, unitImprovementRegistry, "f");
        __classPrivateFieldSet(this, _FortifyDefender_unitRegistry, unitRegistry, "f");
    }
    attempt(action) {
        return new Promise((resolve) => {
            const unit = action.value(), [tileCity] = __classPrivateFieldGet(this, _FortifyDefender_cityRegistry, "f").getByTile(unit.tile());
            if (!tileCity) {
                resolve(false);
                return;
            }
            const defendingUnits = __classPrivateFieldGet(this, _FortifyDefender_unitRegistry, "f")
                .getByTile(tileCity.tile())
                .filter((unit) => (0, isDefender_1.isDefender)(unit, __classPrivateFieldGet(this, _FortifyDefender_ruleRegistry, "f"))), cityGrowth = __classPrivateFieldGet(this, _FortifyDefender_cityGrowthRegistry, "f").getByCity(tileCity);
            if ((0, isDefender_1.isDefended)(defendingUnits.length, cityGrowth.size())) {
                resolve(false);
                return;
            }
            const [fortify] = unit
                .actions()
                .filter((action) => action instanceof Fortify_1.default);
            fortify.perform();
            resolve(true);
        });
    }
}
exports.FortifyDefender = FortifyDefender;
_FortifyDefender_cityGrowthRegistry = new WeakMap(), _FortifyDefender_cityRegistry = new WeakMap(), _FortifyDefender_ruleRegistry = new WeakMap(), _FortifyDefender_unitRegistry = new WeakMap(), _FortifyDefender_unitImprovementRegistry = new WeakMap();
exports.default = FortifyDefender;
//# sourceMappingURL=FortifyDefender.js.map