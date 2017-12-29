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
var ChartModel = /** @class */ (function (_super) {
    __extends(ChartModel, _super);
    function ChartModel(mediator) {
        return _super.call(this, mediator) || this;
    }
    // listen to model events
    ChartModel.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.model.chart.change", null, function (e, args) {
                _this.onChange(args);
            })
        ]);
    };
    // dispose model events
    ChartModel.prototype.dispose = function () {
        this.unsubscribeToEvents();
    };
    ChartModel.prototype.onChange = function (args) {
        var _this = this;
        var p = {
            Normalized: false,
            NumberOfDays: 365,
            DataPeriod: "Day",
            Elements: [
                { Symbol: args, Type: "price", Params: ["ohlc"] }
            ]
        };
        var queryString = "parameters=" + encodeURIComponent(JSON.stringify(p));
        this.getAsync("jsonp", queryString)
            .then(function (data) {
            // format data
            var chartData = _this.formatModel(args, data);
            // pass control to the market view
            _this.triggerEvent(new framework_1.AppEvent("app.view.chart.render", chartData, null));
        })
            .catch(function (e) {
            // pass control to the global error handler
            _this.triggerEvent(new framework_1.AppEvent("app.error", e, null));
        });
    };
    ChartModel.prototype.formatModel = function (symbol, data) {
        var chartData = {
            title: symbol,
            series: []
        };
        var series = [
            {
                name: "open",
                data: data.Elements[0].DataSeries.open.values
            },
            {
                name: "close",
                data: data.Elements[0].DataSeries.close.values
            },
            {
                name: "high",
                data: data.Elements[0].DataSeries.high.values
            },
            {
                name: "low",
                data: data.Elements[0].DataSeries.low.values
            }
        ];
        for (var i = 0; i < series.length; i++) {
            var serie = {
                name: series[i].name,
                data: []
            };
            for (var j = 0; j < series[i].data.length; j++) {
                var val = series[i].data[j];
                var d = new Date(data.Dates[j]).getTime();
                serie.data.push([d, val]);
            }
            chartData.series.push(serie);
        }
        return chartData;
    };
    ChartModel = __decorate([
        framework_1.ModelSettings("http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp")
    ], ChartModel);
    return ChartModel;
}(framework_1.Model));
exports.ChartModel = ChartModel;
