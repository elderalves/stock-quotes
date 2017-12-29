"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = /** @class */ (function () {
    function EventEmitter(mediator) {
        this._mediator = mediator;
    }
    EventEmitter.prototype.triggerEvent = function (event) {
        this._mediator.publish(event);
    };
    EventEmitter.prototype.subscribeToEvents = function (events) {
        this._events = events;
        for (var i = 0; i < this._events.length; i++) {
            this._mediator.subscribe(this._events[i]);
        }
    };
    EventEmitter.prototype.unsubscribeToEvents = function () {
        for (var i = 0; i < this._events.length; i++) {
            this._mediator.unsubscribe(this._events[i]);
        }
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
