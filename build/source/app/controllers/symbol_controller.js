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
Object.defineProperty(exports, "__esModule", { value: true });
var framework_1 = require("../../framework/framework");
var quote_model_1 = require("../models/quote_model");
var chart_model_1 = require("../models/chart_model");
var symbol_view_1 = require("../views/symbol_view");
var chart_view_1 = require("../views/chart_view");
var SymbolController = /** @class */ (function (_super) {
    __extends(SymbolController, _super);
    function SymbolController(mediator) {
        var _this = _super.call(this, mediator) || this;
        _this._quoteModel = new quote_model_1.QuoteModel(mediator);
        _this._chartModel = new chart_model_1.ChartModel(mediator);
        _this._symbolView = new symbol_view_1.SymbolView(mediator);
        _this._chartView = new chart_view_1.ChartView(mediator);
        return _this;
    }
    // initialize view/models and strat listening to controller actions
    SymbolController.prototype.initialize = function () {
        var _this = this;
        // subscribe to controller action events
        this.subscribeToEvents([
            new framework_1.AppEvent("app.controller.symbol.quote", null, function (e, symbol) {
                _this.quote(symbol);
            })
        ]);
        // initialize view and models events
        this._quoteModel.initialize();
        this._chartModel.initialize();
        this._symbolView.initialize();
        this._chartView.initialize();
    };
    // dispose views/models and stop listening to controller actions
    SymbolController.prototype.dispose = function () {
        // dispose the controller events
        this.unsubscribeToEvents();
        // dispose views and model events
        this._symbolView.dispose();
        this._quoteModel.dispose();
        this._chartView.dispose();
        this._chartModel.dispose();
    };
    SymbolController.prototype.quote = function (symbol) {
        this.triggerEvent(new framework_1.AppEvent("app.model.quote.change", symbol, null));
    };
    return SymbolController;
}(framework_1.Controller));
exports.SymbolController = SymbolController;
