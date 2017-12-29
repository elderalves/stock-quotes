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
var NyseModel = /** @class */ (function (_super) {
    __extends(NyseModel, _super);
    function NyseModel(mediator) {
        return _super.call(this, mediator) || this;
    }
    NyseModel.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.model.nyse.change", null, function (e, args) { _this.onChange(args); })
        ]);
    };
    // dispose model events
    NyseModel.prototype.dispose = function () {
        this.unsubscribeToEvents();
    };
    NyseModel.prototype.onChange = function (args) {
        var _this = this;
        this.getAsync("json", args)
            .then(function (data) {
            // format data
            var stocks = {
                items: data,
                market: "NYSE"
            };
            // pass control to the market view
            _this.triggerEvent(new framework_1.AppEvent("app.view.market.render", stocks, null));
        })
            .catch(function (e) {
            // pass control to the global error handler
            _this.triggerEvent(new framework_1.AppEvent("app.error", e, null));
        });
    };
    NyseModel = __decorate([
        framework_1.ModelSettings("./data/nyse.json")
    ], NyseModel);
    return NyseModel;
}(framework_1.Model));
exports.NyseModel = NyseModel;
