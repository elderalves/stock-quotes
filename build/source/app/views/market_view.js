"use strict";
/// <reference path="../../framework/inferfaces" />
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
var MarketView = /** @class */ (function (_super) {
    __extends(MarketView, _super);
    function MarketView(mediator) {
        return _super.call(this, mediator) || this;
    }
    MarketView.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.view.market.render", null, function (e, args) {
                _this.renderAsync(args)
                    .then(function (model) {
                    // set DOM events
                    _this.bindDomEvents(model);
                })
                    .catch(function (e) {
                    // pass control to the global error handler
                    _this.triggerEvent(new framework_1.AppEvent("app.error", e, null));
                });
            }),
        ]);
    };
    MarketView.prototype.dispose = function () {
        this.unbindDomEvents();
        this.unsubscribeToEvents();
    };
    // initialize DOM events
    MarketView.prototype.bindDomEvents = function (model) {
        var _this = this;
        var scope = $(this._container);
        // handle click on "quote" button
        $(".getQuote").on("click", scope, function (e) {
            var symbol = $(e.currentTarget).data('symbol');
            _this.getStockQuote(symbol);
        });
        // make table sortable and searchable
        $(scope).find("table").DataTable();
    };
    // disposes DOM events
    MarketView.prototype.unbindDomEvents = function () {
        var scope = this._container;
        $(".getQuote").off("click", scope);
        var table = $(scope).find("table").DataTable();
        table.destroy();
    };
    MarketView.prototype.getStockQuote = function (symbol) {
        // navigate to route using route event
        this.triggerEvent(new framework_1.AppEvent("app.route", new framework_1.Route("symbol", "quote", [symbol]), null));
    };
    MarketView = __decorate([
        framework_1.ViewSettings("./source/app/templates/market.hbs", "#outlet")
    ], MarketView);
    return MarketView;
}(framework_1.View));
exports.MarketView = MarketView;
