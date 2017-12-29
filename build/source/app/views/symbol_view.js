"use strict";
/// <reference path="../../framework/framework.ts" />
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var framework_1 = require("../../framework/framework");
var SymbolView = /** @class */ (function (_super) {
    __extends(SymbolView, _super);
    function SymbolView(mediator) {
        return _super.call(this, mediator) || this;
    }
    SymbolView.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.view.symbol.render", null, function (e, model) {
                _this.renderAsync(model)
                    .then(function (model) {
                    // set DOM events
                    _this.bindDomEvents(model);
                    // pass control to chart view
                    _this.triggerEvent(new framework_1.AppEvent("app.model.chart.change", model.quote.Symbol, null));
                })
                    .catch(function (e) {
                    _this.triggerEvent(new framework_1.AppEvent("app.error", e, null));
                });
            })
        ]);
    };
    SymbolView.prototype.dispose = function () {
        this.unbindDomEvents();
        this.unsubscribeToEvents();
    };
    // initializes DOM events
    SymbolView.prototype.bindDomEvents = function (model) {
        var scope = $(this._container);
        // set DOM events here
    };
    // disposes DOM events
    SymbolView.prototype.unbindDomEvents = function () {
        var scope = this._container;
        // kill DOM events here
    };
    SymbolView = __decorate([
        framework_1.ViewSettings("./source/app/templates/symbol.hbs", "#outlet")
    ], SymbolView);
    return SymbolView;
}(framework_1.View));
exports.SymbolView = SymbolView;
