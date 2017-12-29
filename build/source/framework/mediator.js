"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mediator = /** @class */ (function () {
    function Mediator(isDebug) {
        if (isDebug === void 0) { isDebug = false; }
        this._$ = $({});
        this._isDebug = isDebug;
    }
    Mediator.prototype.publish = function (e) {
        if (this._isDebug === true) {
            console.log(new Date().getTime(), "PUBLISH", e.topic, e.data);
        }
        this._$.trigger(e.topic, e.data);
    };
    Mediator.prototype.subscribe = function (e) {
        if (this._isDebug === true) {
            console.log(new Date().getTime(), "SUBSCRIBE", e.topic, e.data);
        }
        this._$.on(e.topic, e.handler);
    };
    Mediator.prototype.unsubscribe = function (e) {
        if (this._isDebug === true) {
            console.log(new Date().getTime(), "UNSUBSCRIBE", e.topic, e.data);
        }
        this._$.off(e.topic);
    };
    return Mediator;
}());
exports.Mediator = Mediator;
