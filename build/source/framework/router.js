"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var event_emitter_1 = require("./event_emitter");
var app_event_1 = require("./app_event");
var route_1 = require("./route");
var Router = /** @class */ (function (_super) {
    __extends(Router, _super);
    function Router(mediator, defaultController, defaultAction) {
        var _this = _super.call(this, mediator) || this;
        _this._defaultController = defaultController || "home";
        _this._defaultAction = defaultAction || "index";
        return _this;
    }
    Router.prototype.initialize = function () {
        var _this = this;
        // observe URL changes by users
        $(window).on('hashchange', function () {
            var r = _this.getRoute();
            _this.onRouteChange(r);
        });
        // be able to trigger URL changes
        this.subscribeToEvents([
            new app_event_1.AppEvent("app.initialize", null, function (e, data) {
                _this.onRouteChange(_this.getRoute());
            }),
            new app_event_1.AppEvent("app.route", null, function (e, data) {
                _this.setRoute(data);
            }),
        ]);
    };
    // Encapsulates reading the URL
    Router.prototype.getRoute = function () {
        var h = window.location.hash;
        return this.parseRoute(h);
    };
    // Encapsulates writing the URL
    Router.prototype.setRoute = function (route) {
        var s = route.serialize();
        window.location.hash = s;
    };
    // Encapsulates parsing an URL
    Router.prototype.parseRoute = function (hash) {
        var comp, controller, action, args, i;
        if (hash[hash.length - 1] === "/") {
            hash = hash.substring(0, hash.length - 1);
        }
        comp = hash.replace("#", '').split("/");
        controller = comp[0] || this._defaultController;
        action = comp[1] || this._defaultAction;
        args = [];
        for (i = 2; i < comp.length; i++) {
            args.push(comp[i]);
        }
        return new route_1.Route(controller, action, args);
    };
    // Pass control to the Dispatcher via the Mediator
    Router.prototype.onRouteChange = function (route) {
        this.triggerEvent(new app_event_1.AppEvent("app.dispatch", route, null));
    };
    return Router;
}(event_emitter_1.EventEmitter));
exports.Router = Router;
