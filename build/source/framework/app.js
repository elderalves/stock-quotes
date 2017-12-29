"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dispatcher_1 = require("./dispatcher");
var mediator_1 = require("./mediator");
var app_event_1 = require("./app_event");
var router_1 = require("./router");
var App = /** @class */ (function () {
    function App(appSettings) {
        this._controllers = appSettings.controllers;
        this._mediator = new mediator_1.Mediator(appSettings.isDebug || false);
        this._router = new router_1.Router(this._mediator, appSettings.defaultController, appSettings.defaultAction);
        this._dispatcher = new dispatcher_1.Dispatcher(this._mediator, this._controllers);
        this._onErrorHandler = appSettings.onErrorHandler;
    }
    App.prototype.initialize = function () {
        var _this = this;
        this._router.initialize();
        this._dispatcher.initialize();
        this._mediator.subscribe(new app_event_1.AppEvent("app.error", null, function (e, data) {
            _this._onErrorHandler(data);
        }));
    };
    return App;
}());
exports.App = App;
