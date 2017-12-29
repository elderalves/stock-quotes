"use strict";
/// <reference path="../../framework/interfaces" />
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
var framework_1 = require("../../framework/framework");
var market_view_1 = require("../views/market_view");
var nasdaq_model_1 = require("../models/nasdaq_model");
var nyse_model_1 = require("../models/nyse_model");
var MarketController = /** @class */ (function (_super) {
    __extends(MarketController, _super);
    function MarketController(mediator) {
        var _this = _super.call(this, mediator) || this;
        _this._marketView = new market_view_1.MarketView(mediator);
        _this._nasdaqModel = new nasdaq_model_1.NasdaqModel(mediator);
        _this._nyseModel = new nyse_model_1.NyseModel(mediator);
        return _this;
    }
    MarketController.prototype.initialize = function () {
        var _this = this;
        // subscribe to controller action events
        this.subscribeToEvents([
            new framework_1.AppEvent("app.controller.market.nasdaq", null, function (e, args) {
                _this.nasdaq(args);
            }),
            new framework_1.AppEvent("app.controller.market.nyse", null, function (e, args) {
                _this.nyse(args);
            })
        ]);
        // initialize view and models events
        this._marketView.initialize();
        this._nasdaqModel.initialize();
        this._nyseModel.initialize();
    };
    // dispose view/models and stop listening to controller actions
    MarketController.prototype.dispose = function () {
        // dipose the controller events
        this.unsubscribeToEvents();
        // dipose views and model events
        this._marketView.dispose();
        this._nasdaqModel.dispose();
        this._nyseModel.dispose();
    };
    // display NASDAQ stocks
    MarketController.prototype.nasdaq = function (args) {
        this._mediator.publish(new framework_1.AppEvent("app.model.nasdaq.change", null, null));
    };
    // display NYSE stocks
    MarketController.prototype.nyse = function (args) {
        this._mediator.publish(new framework_1.AppEvent("app.model.nyse.change", null, null));
    };
    return MarketController;
}(framework_1.Controller));
exports.MarketController = MarketController;
