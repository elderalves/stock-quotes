(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TsStock = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../../framework/framework":16,"../models/nasdaq_model":5,"../models/nyse_model":6,"../views/market_view":9}],2:[function(require,module,exports){
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

},{"../../framework/framework":16,"../models/chart_model":4,"../models/quote_model":7,"../views/chart_view":8,"../views/symbol_view":10}],3:[function(require,module,exports){
"use strict";
/// <reference path="../framework/interfaces.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
var framework_1 = require("../framework/framework");
var market_controller_1 = require("./controllers/market_controller");
var symbol_controller_1 = require("./controllers/symbol_controller");
var appSettings = {
    isDebug: true,
    defaultController: "market",
    defaultAction: "nasdaq",
    controllers: [
        {
            controllerName: "market",
            controller: market_controller_1.MarketController
        },
        {
            controllerName: "symbol",
            controller: symbol_controller_1.SymbolController
        }
    ],
    onErrorHandler: function (e) {
        alert("Sorry! there has been an error please checkout the console for more info!");
        console.log(e.toString());
    }
};
var myApp = new framework_1.App(appSettings);
myApp.initialize();

},{"../framework/framework":16,"./controllers/market_controller":1,"./controllers/symbol_controller":2}],4:[function(require,module,exports){
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

},{"../../framework/framework":16}],5:[function(require,module,exports){
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
var NasdaqModel = /** @class */ (function (_super) {
    __extends(NasdaqModel, _super);
    function NasdaqModel(mediator) {
        return _super.call(this, mediator) || this;
    }
    NasdaqModel.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.model.nasdaq.change", null, function (e, args) { _this.onChange(args); })
        ]);
    };
    // dispose model events
    NasdaqModel.prototype.dispose = function () {
        this.unsubscribeToEvents();
    };
    NasdaqModel.prototype.onChange = function (args) {
        var _this = this;
        this.getAsync("json", args)
            .then(function (data) {
            // format data
            var stocks = {
                items: data,
                market: "NASDAQ"
            };
            // pass control to the market view
            _this.triggerEvent(new framework_1.AppEvent("app.view.market.render", stocks, null));
        })
            .catch(function (e) {
            // pass control to the global error handler
            _this.triggerEvent(new framework_1.AppEvent("app.error", e, null));
        });
    };
    NasdaqModel = __decorate([
        framework_1.ModelSettings("./data/nasdaq.json")
    ], NasdaqModel);
    return NasdaqModel;
}(framework_1.Model));
exports.NasdaqModel = NasdaqModel;

},{"../../framework/framework":16}],6:[function(require,module,exports){
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

},{"../../framework/framework":16}],7:[function(require,module,exports){
"use strict";
/// <reference path="../../framework/interfaces.ts" />
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
var QuoteModel = /** @class */ (function (_super) {
    __extends(QuoteModel, _super);
    function QuoteModel(mediator) {
        return _super.call(this, mediator) || this;
    }
    // listen to model events
    QuoteModel.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.model.quote.change", null, function (e, args) {
                _this.onChange(args);
            })
        ]);
    };
    // dispose model events
    QuoteModel.prototype.dispose = function () {
        this.unsubscribeToEvents();
    };
    QuoteModel.prototype.onChange = function (args) {
        var _this = this;
        // format args
        var s = { symbol: args };
        this.getAsync("jsonp", s)
            .then(function (data) {
            // format data
            var quote = _this.formatModel(data);
            // pass control to the market view
            _this.triggerEvent(new framework_1.AppEvent("app.view.symbol.render", quote, null));
        })
            .catch(function (e) {
            // pass control to the global error handler
            _this.triggerEvent(new framework_1.AppEvent("app.error", e, null));
        });
    };
    QuoteModel.prototype.formatModel = function (data) {
        data.Change = data.Change.toFixed(2);
        data.ChangePercent = data.ChangePercent.toFixed(2);
        data.Timestamp = new Date(data.Timestamp).toLocaleDateString();
        data.MarketCap = (data.MarketCap / 1000000).toFixed(2) + "M.";
        data.ChangePercentYTD = data.ChangePercentYTD.toFixed(2);
        return { quote: data };
    };
    QuoteModel = __decorate([
        framework_1.ModelSettings("http://dev.markitondemand.com/Api/v2/Quote/jsonp")
    ], QuoteModel);
    return QuoteModel;
}(framework_1.Model));
exports.QuoteModel = QuoteModel;

},{"../../framework/framework":16}],8:[function(require,module,exports){
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
var ChartView = /** @class */ (function (_super) {
    __extends(ChartView, _super);
    function ChartView(mediator) {
        return _super.call(this, mediator) || this;
    }
    ChartView.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new framework_1.AppEvent("app.view.chart.render", null, function (e, model) {
                _this.renderChart(model);
                _this.bindDomEvents(model);
            })
        ]);
    };
    ChartView.prototype.dispose = function () {
        this.unbindDomEvents();
        this.unsubscribeToEvents();
    };
    // initializes DOM Events
    ChartView.prototype.bindDomEvents = function (model) {
        var scope = $(this._container);
        // set DOM events here
    };
    // disposes DOM events
    ChartView.prototype.unbindDomEvents = function () {
        var scope = this._container;
        // kill DOM events here
    };
    ChartView.prototype.renderChart = function (model) {
        $(this._container).highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: model.title
            },
            subtitle: {
                text: "Click and drag in the plot area to zoom in"
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Price'
                }
            },
            legend: {
                enabled: true
            },
            tooltip: {
                shared: true,
                crosshairs: true
            },
            plotOptions: {
                area: {
                    marker: {
                        radius: 0
                    },
                    lineWidth: 0.1,
                    threshold: null
                }
            },
            series: model.series
        });
    };
    ChartView = __decorate([
        framework_1.ViewSettings(null, "#chart_container")
    ], ChartView);
    return ChartView;
}(framework_1.View));
exports.ChartView = ChartView;

},{"../../framework/framework":16}],9:[function(require,module,exports){
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

},{"../../framework/framework":16}],10:[function(require,module,exports){
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

},{"../../framework/framework":16}],11:[function(require,module,exports){
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

},{"./app_event":12,"./dispatcher":14,"./mediator":17,"./router":20}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppEvent = /** @class */ (function () {
    function AppEvent(topic, data, handler) {
        this.topic = topic;
        this.data = data;
        this.handler = handler;
    }
    return AppEvent;
}());
exports.AppEvent = AppEvent;

},{}],13:[function(require,module,exports){
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
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller(mediator) {
        return _super.call(this, mediator) || this;
    }
    Controller.prototype.initialize = function () {
        throw new Error('Controller.prototype.initialize() is abstract you must implement it!');
    };
    Controller.prototype.dispose = function () {
        throw new Error('Controller.prototype.dispose() is abstract you must implement it!');
    };
    return Controller;
}(event_emitter_1.EventEmitter));
exports.Controller = Controller;

},{"./event_emitter":15}],14:[function(require,module,exports){
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
var Dispatcher = /** @class */ (function (_super) {
    __extends(Dispatcher, _super);
    function Dispatcher(mediator, controllers) {
        var _this = _super.call(this, mediator) || this;
        _this._controllersHashMap = _this.getController(controllers);
        return _this;
    }
    // listen to app.dispatch events
    Dispatcher.prototype.initialize = function () {
        var _this = this;
        this.subscribeToEvents([
            new app_event_1.AppEvent("app.dispatch", null, function (e, data) {
                _this.dispatch(data);
            })
        ]);
    };
    Dispatcher.prototype.getController = function (controllers) {
        var hashMap, hashMapEntry, name, controller, l;
        hashMap = {};
        l = controllers.length;
        if (l <= 0) {
            this.triggerEvent(new app_event_1.AppEvent("app.error", "Cannot create an application without at least one controller", null));
        }
        for (var i = 0; i < l; i++) {
            controller = controllers[i];
            name = controller.controllerName;
            hashMapEntry = hashMap[name];
            if (hashMapEntry !== null && hashMapEntry !== undefined) {
                this.triggerEvent(new app_event_1.AppEvent("app.error", "Two controller cannot use the same name", null));
            }
            hashMap[name] = controller.controller;
        }
        return hashMap;
    };
    Dispatcher.prototype.dispatch = function (route) {
        var Controller = this._controllersHashMap[route.controllerName];
        // try to find controller
        if (Controller === null || Controller === undefined) {
            this.triggerEvent(new app_event_1.AppEvent("app.error", "Controller not found: " + route.controllerName, null));
        }
        else {
            // create a controller instance
            var controller = new Controller(this._mediator);
            // action is not available
            var a = controller[route.actionName];
            if (a === null || a === undefined) {
                this.triggerEvent(new app_event_1.AppEvent("app.error", "Action not found in controller: " + route.controllerName + " - + " + route.actionName, null));
            }
            else {
                // action is available
                if (this._currentController == null) {
                    // initialize controller
                    this._currentControllerName = route.controllerName;
                    this._currentController = controller;
                    this._currentController.initialize();
                }
                else {
                    // dispose previous controller if not needed
                    if (this._currentControllerName !== route.controllerName) {
                        this._currentController.dispose();
                        this._currentControllerName = route.controllerName;
                        this._currentController = controller;
                        this._currentController.initialize();
                    }
                }
                // pass flow from dispatcher to the controller
                this.triggerEvent(new app_event_1.AppEvent("app.controller." + this._currentControllerName + "." + route.actionName, route.args, null));
            }
        }
    };
    return Dispatcher;
}(event_emitter_1.EventEmitter));
exports.Dispatcher = Dispatcher;

},{"./app_event":12,"./event_emitter":15}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
exports.App = app_1.App;
var route_1 = require("./route");
exports.Route = route_1.Route;
var app_event_1 = require("./app_event");
exports.AppEvent = app_event_1.AppEvent;
var controller_1 = require("./controller");
exports.Controller = controller_1.Controller;
var view_1 = require("./view");
exports.View = view_1.View;
exports.ViewSettings = view_1.ViewSettings;
var model_1 = require("./model");
exports.Model = model_1.Model;
exports.ModelSettings = model_1.ModelSettings;

},{"./app":11,"./app_event":12,"./controller":13,"./model":18,"./route":19,"./view":21}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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
function ModelSettings(serviceUrl) {
    return function (target) {
        // save a reference to the original constructor
        var original = target;
        // a utitily fucntion to generate instances of a class
        function construct(constructor, args) {
            var c = function () {
                return constructor.apply(this, args);
            };
            c.prototype = constructor.prototype;
            var instance = new c();
            instance._serviceUrl = serviceUrl;
            return instance;
        }
        // the new constructor behavior
        var f = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return construct(original, args);
        };
        // copy prototype so instanceof operator still works
        f.prototype - original.prototype;
        // return new constructor ( will override original )
        return f;
    };
}
exports.ModelSettings = ModelSettings;
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model(mediator) {
        return _super.call(this, mediator) || this;
    }
    // must be implemented by derived classes
    Model.prototype.initialize = function () {
        throw new Error("Model.prototype.initilize() is abstract and must implemented.");
    };
    // must be implemented by derived classes
    Model.prototype.dispose = function () {
        throw new Error('Model.prototype.dispose() is abstract and must implemented');
    };
    Model.prototype.requestAsync = function (method, dataType, data) {
        var _this = this;
        return Q.Promise(function (resolve, reject) {
            $.ajax({
                method: method,
                url: _this._serviceUrl,
                data: data || {},
                dataType: dataType,
                success: function (response) {
                    resolve(response);
                },
                error: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    reject(args);
                }
            });
        });
    };
    Model.prototype.getAsync = function (dataType, data) {
        return this.requestAsync("GET", dataType, data);
    };
    Model.prototype.postAsync = function (dataType, data) {
        return this.requestAsync("POST", dataType, data);
    };
    Model.prototype.putAsync = function (dataType, data) {
        return this.requestAsync("PUT", dataType, data);
    };
    Model.prototype.deleteAsync = function (dataType, data) {
        return this.requestAsync("DELETE", dataType, data);
    };
    return Model;
}(event_emitter_1.EventEmitter));
exports.Model = Model;

},{"./event_emitter":15}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Route = /** @class */ (function () {
    function Route(controllerName, actionName, args) {
        this.controllerName = controllerName;
        this.actionName = actionName;
        this.args = args;
    }
    Route.prototype.serialize = function () {
        var s, sargs;
        sargs = this.args.map(function (a) { return a.toString(); }).join("/");
        s = this.controllerName + "/" + this.actionName + "/" + sargs;
        return s;
    };
    return Route;
}());
exports.Route = Route;

},{}],20:[function(require,module,exports){
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

},{"./app_event":12,"./event_emitter":15,"./route":19}],21:[function(require,module,exports){
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
function ViewSettings(templateUrl, container) {
    return function (target) {
        var original = target;
        function construct(constructor, args) {
            var c = function () {
                return constructor.apply(this, args);
            };
            c.prototype = constructor.prototype;
            var instance = new c();
            instance._container = container;
            instance._templateUrl = templateUrl;
            return instance;
        }
        var f = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return construct(original, args);
        };
        f.prototype = original.prototype;
        return f;
    };
}
exports.ViewSettings = ViewSettings;
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(mediator) {
        return _super.call(this, mediator) || this;
    }
    // must be implemented by derived classes
    View.prototype.initialize = function () {
        throw new Error("View.prototype.initialize() is abstract and must be implemented.");
    };
    // must be implemented by derived classes
    View.prototype.dispose = function () {
        throw new Error("View.prototype.dispose() is abstract and must be implemented.");
    };
    // must be implemented by derived classes
    View.prototype.bindDomEvents = function (model) {
        throw new Error('View.prototype.bindDomEvents() is abstract and must be implemented.');
    };
    // must be implemented by derived classes
    View.prototype.unbindDomEvents = function () {
        throw new Error('View.prototype.unbindDomEvents() is abstract and must be implemented');
    };
    // asynchroniusly loads a template
    View.prototype.loadTemplateAsync = function () {
        var _this = this;
        return Q.Promise(function (resolve, reject) {
            $.ajax({
                method: "GET",
                url: _this._templateUrl,
                dataType: "text",
                success: function (response) {
                    resolve(response);
                },
                error: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    reject(args);
                }
            });
        });
    };
    // asynchroniusly compile a template
    View.prototype.compileTemplateAsync = function (source) {
        return Q.Promise(function (resolve, reject) {
            try {
                var template = Handlebars.compile(source);
                resolve(template);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    // asynchroniusly loads and compile a template if not done already
    View.prototype.getTemplateAsync = function () {
        var _this = this;
        return Q.Promise(function (resolve, reject) {
            if (_this._templateDelegate === undefined || _this._templateDelegate === null) {
                _this.loadTemplateAsync()
                    .then(function (source) {
                    return _this.compileTemplateAsync(source);
                })
                    .then(function (templateDelegate) {
                    _this._templateDelegate = templateDelegate;
                    resolve(_this._templateDelegate);
                })
                    .catch(function (e) { reject(e); });
            }
            else {
                resolve(_this._templateDelegate);
            }
        });
    };
    // asynchroniusly renders the view
    View.prototype.renderAsync = function (model) {
        var _this = this;
        return Q.Promise(function (resolve, reject) {
            _this.getTemplateAsync()
                .then(function (templateDelegate) {
                // generate html and append to the DOM
                console.log(_this);
                var html = _this._templateDelegate(model);
                $(_this._container).html(html);
                // pass model to resolve so it can be used by
                // subviews and DOM event initializer
                resolve(model);
            })
                .catch(function (e) { reject(e); });
        });
    };
    return View;
}(event_emitter_1.EventEmitter));
exports.View = View;

},{"./event_emitter":15}]},{},[3])(3)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9zb3VyY2UvYXBwL2NvbnRyb2xsZXJzL21hcmtldF9jb250cm9sbGVyLmpzIiwiYnVpbGQvc291cmNlL2FwcC9jb250cm9sbGVycy9zeW1ib2xfY29udHJvbGxlci5qcyIsImJ1aWxkL3NvdXJjZS9hcHAvbWFpbi5qcyIsImJ1aWxkL3NvdXJjZS9hcHAvbW9kZWxzL2NoYXJ0X21vZGVsLmpzIiwiYnVpbGQvc291cmNlL2FwcC9tb2RlbHMvbmFzZGFxX21vZGVsLmpzIiwiYnVpbGQvc291cmNlL2FwcC9tb2RlbHMvbnlzZV9tb2RlbC5qcyIsImJ1aWxkL3NvdXJjZS9hcHAvbW9kZWxzL3F1b3RlX21vZGVsLmpzIiwiYnVpbGQvc291cmNlL2FwcC92aWV3cy9jaGFydF92aWV3LmpzIiwiYnVpbGQvc291cmNlL2FwcC92aWV3cy9tYXJrZXRfdmlldy5qcyIsImJ1aWxkL3NvdXJjZS9hcHAvdmlld3Mvc3ltYm9sX3ZpZXcuanMiLCJidWlsZC9zb3VyY2UvZnJhbWV3b3JrL2FwcC5qcyIsImJ1aWxkL3NvdXJjZS9mcmFtZXdvcmsvYXBwX2V2ZW50LmpzIiwiYnVpbGQvc291cmNlL2ZyYW1ld29yay9jb250cm9sbGVyLmpzIiwiYnVpbGQvc291cmNlL2ZyYW1ld29yay9kaXNwYXRjaGVyLmpzIiwiYnVpbGQvc291cmNlL2ZyYW1ld29yay9ldmVudF9lbWl0dGVyLmpzIiwiYnVpbGQvc291cmNlL2ZyYW1ld29yay9mcmFtZXdvcmsuanMiLCJidWlsZC9zb3VyY2UvZnJhbWV3b3JrL21lZGlhdG9yLmpzIiwiYnVpbGQvc291cmNlL2ZyYW1ld29yay9tb2RlbC5qcyIsImJ1aWxkL3NvdXJjZS9mcmFtZXdvcmsvcm91dGUuanMiLCJidWlsZC9zb3VyY2UvZnJhbWV3b3JrL3JvdXRlci5qcyIsImJ1aWxkL3NvdXJjZS9mcmFtZXdvcmsvdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9mcmFtZXdvcmsvaW50ZXJmYWNlc1wiIC8+XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBmcmFtZXdvcmtfMSA9IHJlcXVpcmUoXCIuLi8uLi9mcmFtZXdvcmsvZnJhbWV3b3JrXCIpO1xudmFyIG1hcmtldF92aWV3XzEgPSByZXF1aXJlKFwiLi4vdmlld3MvbWFya2V0X3ZpZXdcIik7XG52YXIgbmFzZGFxX21vZGVsXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL25hc2RhcV9tb2RlbFwiKTtcbnZhciBueXNlX21vZGVsXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL255c2VfbW9kZWxcIik7XG52YXIgTWFya2V0Q29udHJvbGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFya2V0Q29udHJvbGxlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYXJrZXRDb250cm9sbGVyKG1lZGlhdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG1lZGlhdG9yKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fbWFya2V0VmlldyA9IG5ldyBtYXJrZXRfdmlld18xLk1hcmtldFZpZXcobWVkaWF0b3IpO1xuICAgICAgICBfdGhpcy5fbmFzZGFxTW9kZWwgPSBuZXcgbmFzZGFxX21vZGVsXzEuTmFzZGFxTW9kZWwobWVkaWF0b3IpO1xuICAgICAgICBfdGhpcy5fbnlzZU1vZGVsID0gbmV3IG55c2VfbW9kZWxfMS5OeXNlTW9kZWwobWVkaWF0b3IpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE1hcmtldENvbnRyb2xsZXIucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBjb250cm9sbGVyIGFjdGlvbiBldmVudHNcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0V2ZW50cyhbXG4gICAgICAgICAgICBuZXcgZnJhbWV3b3JrXzEuQXBwRXZlbnQoXCJhcHAuY29udHJvbGxlci5tYXJrZXQubmFzZGFxXCIsIG51bGwsIGZ1bmN0aW9uIChlLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubmFzZGFxKGFyZ3MpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgZnJhbWV3b3JrXzEuQXBwRXZlbnQoXCJhcHAuY29udHJvbGxlci5tYXJrZXQubnlzZVwiLCBudWxsLCBmdW5jdGlvbiAoZSwgYXJncykge1xuICAgICAgICAgICAgICAgIF90aGlzLm55c2UoYXJncyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICBdKTtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB2aWV3IGFuZCBtb2RlbHMgZXZlbnRzXG4gICAgICAgIHRoaXMuX21hcmtldFZpZXcuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB0aGlzLl9uYXNkYXFNb2RlbC5pbml0aWFsaXplKCk7XG4gICAgICAgIHRoaXMuX255c2VNb2RlbC5pbml0aWFsaXplKCk7XG4gICAgfTtcbiAgICAvLyBkaXNwb3NlIHZpZXcvbW9kZWxzIGFuZCBzdG9wIGxpc3RlbmluZyB0byBjb250cm9sbGVyIGFjdGlvbnNcbiAgICBNYXJrZXRDb250cm9sbGVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBkaXBvc2UgdGhlIGNvbnRyb2xsZXIgZXZlbnRzXG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVUb0V2ZW50cygpO1xuICAgICAgICAvLyBkaXBvc2Ugdmlld3MgYW5kIG1vZGVsIGV2ZW50c1xuICAgICAgICB0aGlzLl9tYXJrZXRWaWV3LmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fbmFzZGFxTW9kZWwuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9ueXNlTW9kZWwuZGlzcG9zZSgpO1xuICAgIH07XG4gICAgLy8gZGlzcGxheSBOQVNEQVEgc3RvY2tzXG4gICAgTWFya2V0Q29udHJvbGxlci5wcm90b3R5cGUubmFzZGFxID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IucHVibGlzaChuZXcgZnJhbWV3b3JrXzEuQXBwRXZlbnQoXCJhcHAubW9kZWwubmFzZGFxLmNoYW5nZVwiLCBudWxsLCBudWxsKSk7XG4gICAgfTtcbiAgICAvLyBkaXNwbGF5IE5ZU0Ugc3RvY2tzXG4gICAgTWFya2V0Q29udHJvbGxlci5wcm90b3R5cGUubnlzZSA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yLnB1Ymxpc2gobmV3IGZyYW1ld29ya18xLkFwcEV2ZW50KFwiYXBwLm1vZGVsLm55c2UuY2hhbmdlXCIsIG51bGwsIG51bGwpKTtcbiAgICB9O1xuICAgIHJldHVybiBNYXJrZXRDb250cm9sbGVyO1xufShmcmFtZXdvcmtfMS5Db250cm9sbGVyKSk7XG5leHBvcnRzLk1hcmtldENvbnRyb2xsZXIgPSBNYXJrZXRDb250cm9sbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZnJhbWV3b3JrL2ZyYW1ld29yay50c1wiIC8+XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBmcmFtZXdvcmtfMSA9IHJlcXVpcmUoXCIuLi8uLi9mcmFtZXdvcmsvZnJhbWV3b3JrXCIpO1xudmFyIHF1b3RlX21vZGVsXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL3F1b3RlX21vZGVsXCIpO1xudmFyIGNoYXJ0X21vZGVsXzEgPSByZXF1aXJlKFwiLi4vbW9kZWxzL2NoYXJ0X21vZGVsXCIpO1xudmFyIHN5bWJvbF92aWV3XzEgPSByZXF1aXJlKFwiLi4vdmlld3Mvc3ltYm9sX3ZpZXdcIik7XG52YXIgY2hhcnRfdmlld18xID0gcmVxdWlyZShcIi4uL3ZpZXdzL2NoYXJ0X3ZpZXdcIik7XG52YXIgU3ltYm9sQ29udHJvbGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3ltYm9sQ29udHJvbGxlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTeW1ib2xDb250cm9sbGVyKG1lZGlhdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG1lZGlhdG9yKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fcXVvdGVNb2RlbCA9IG5ldyBxdW90ZV9tb2RlbF8xLlF1b3RlTW9kZWwobWVkaWF0b3IpO1xuICAgICAgICBfdGhpcy5fY2hhcnRNb2RlbCA9IG5ldyBjaGFydF9tb2RlbF8xLkNoYXJ0TW9kZWwobWVkaWF0b3IpO1xuICAgICAgICBfdGhpcy5fc3ltYm9sVmlldyA9IG5ldyBzeW1ib2xfdmlld18xLlN5bWJvbFZpZXcobWVkaWF0b3IpO1xuICAgICAgICBfdGhpcy5fY2hhcnRWaWV3ID0gbmV3IGNoYXJ0X3ZpZXdfMS5DaGFydFZpZXcobWVkaWF0b3IpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8vIGluaXRpYWxpemUgdmlldy9tb2RlbHMgYW5kIHN0cmF0IGxpc3RlbmluZyB0byBjb250cm9sbGVyIGFjdGlvbnNcbiAgICBTeW1ib2xDb250cm9sbGVyLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gY29udHJvbGxlciBhY3Rpb24gZXZlbnRzXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9FdmVudHMoW1xuICAgICAgICAgICAgbmV3IGZyYW1ld29ya18xLkFwcEV2ZW50KFwiYXBwLmNvbnRyb2xsZXIuc3ltYm9sLnF1b3RlXCIsIG51bGwsIGZ1bmN0aW9uIChlLCBzeW1ib2wpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5xdW90ZShzeW1ib2wpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgXSk7XG4gICAgICAgIC8vIGluaXRpYWxpemUgdmlldyBhbmQgbW9kZWxzIGV2ZW50c1xuICAgICAgICB0aGlzLl9xdW90ZU1vZGVsLmluaXRpYWxpemUoKTtcbiAgICAgICAgdGhpcy5fY2hhcnRNb2RlbC5pbml0aWFsaXplKCk7XG4gICAgICAgIHRoaXMuX3N5bWJvbFZpZXcuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB0aGlzLl9jaGFydFZpZXcuaW5pdGlhbGl6ZSgpO1xuICAgIH07XG4gICAgLy8gZGlzcG9zZSB2aWV3cy9tb2RlbHMgYW5kIHN0b3AgbGlzdGVuaW5nIHRvIGNvbnRyb2xsZXIgYWN0aW9uc1xuICAgIFN5bWJvbENvbnRyb2xsZXIucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGRpc3Bvc2UgdGhlIGNvbnRyb2xsZXIgZXZlbnRzXG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVUb0V2ZW50cygpO1xuICAgICAgICAvLyBkaXNwb3NlIHZpZXdzIGFuZCBtb2RlbCBldmVudHNcbiAgICAgICAgdGhpcy5fc3ltYm9sVmlldy5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX3F1b3RlTW9kZWwuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9jaGFydFZpZXcuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLl9jaGFydE1vZGVsLmRpc3Bvc2UoKTtcbiAgICB9O1xuICAgIFN5bWJvbENvbnRyb2xsZXIucHJvdG90eXBlLnF1b3RlID0gZnVuY3Rpb24gKHN5bWJvbCkge1xuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgZnJhbWV3b3JrXzEuQXBwRXZlbnQoXCJhcHAubW9kZWwucXVvdGUuY2hhbmdlXCIsIHN5bWJvbCwgbnVsbCkpO1xuICAgIH07XG4gICAgcmV0dXJuIFN5bWJvbENvbnRyb2xsZXI7XG59KGZyYW1ld29ya18xLkNvbnRyb2xsZXIpKTtcbmV4cG9ydHMuU3ltYm9sQ29udHJvbGxlciA9IFN5bWJvbENvbnRyb2xsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9mcmFtZXdvcmsvaW50ZXJmYWNlcy50c1wiLz5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBmcmFtZXdvcmtfMSA9IHJlcXVpcmUoXCIuLi9mcmFtZXdvcmsvZnJhbWV3b3JrXCIpO1xudmFyIG1hcmtldF9jb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVycy9tYXJrZXRfY29udHJvbGxlclwiKTtcbnZhciBzeW1ib2xfY29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvc3ltYm9sX2NvbnRyb2xsZXJcIik7XG52YXIgYXBwU2V0dGluZ3MgPSB7XG4gICAgaXNEZWJ1ZzogdHJ1ZSxcbiAgICBkZWZhdWx0Q29udHJvbGxlcjogXCJtYXJrZXRcIixcbiAgICBkZWZhdWx0QWN0aW9uOiBcIm5hc2RhcVwiLFxuICAgIGNvbnRyb2xsZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiBcIm1hcmtldFwiLFxuICAgICAgICAgICAgY29udHJvbGxlcjogbWFya2V0X2NvbnRyb2xsZXJfMS5NYXJrZXRDb250cm9sbGVyXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiBcInN5bWJvbFwiLFxuICAgICAgICAgICAgY29udHJvbGxlcjogc3ltYm9sX2NvbnRyb2xsZXJfMS5TeW1ib2xDb250cm9sbGVyXG4gICAgICAgIH1cbiAgICBdLFxuICAgIG9uRXJyb3JIYW5kbGVyOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICBhbGVydChcIlNvcnJ5ISB0aGVyZSBoYXMgYmVlbiBhbiBlcnJvciBwbGVhc2UgY2hlY2tvdXQgdGhlIGNvbnNvbGUgZm9yIG1vcmUgaW5mbyFcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGUudG9TdHJpbmcoKSk7XG4gICAgfVxufTtcbnZhciBteUFwcCA9IG5ldyBmcmFtZXdvcmtfMS5BcHAoYXBwU2V0dGluZ3MpO1xubXlBcHAuaW5pdGlhbGl6ZSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZnJhbWV3b3JrL2ZyYW1ld29yay50c1wiIC8+XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBmcmFtZXdvcmtfMSA9IHJlcXVpcmUoXCIuLi8uLi9mcmFtZXdvcmsvZnJhbWV3b3JrXCIpO1xudmFyIENoYXJ0TW9kZWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENoYXJ0TW9kZWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2hhcnRNb2RlbChtZWRpYXRvcikge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgbWVkaWF0b3IpIHx8IHRoaXM7XG4gICAgfVxuICAgIC8vIGxpc3RlbiB0byBtb2RlbCBldmVudHNcbiAgICBDaGFydE1vZGVsLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnN1YnNjcmliZVRvRXZlbnRzKFtcbiAgICAgICAgICAgIG5ldyBmcmFtZXdvcmtfMS5BcHBFdmVudChcImFwcC5tb2RlbC5jaGFydC5jaGFuZ2VcIiwgbnVsbCwgZnVuY3Rpb24gKGUsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbkNoYW5nZShhcmdzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIF0pO1xuICAgIH07XG4gICAgLy8gZGlzcG9zZSBtb2RlbCBldmVudHNcbiAgICBDaGFydE1vZGVsLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlVG9FdmVudHMoKTtcbiAgICB9O1xuICAgIENoYXJ0TW9kZWwucHJvdG90eXBlLm9uQ2hhbmdlID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHAgPSB7XG4gICAgICAgICAgICBOb3JtYWxpemVkOiBmYWxzZSxcbiAgICAgICAgICAgIE51bWJlck9mRGF5czogMzY1LFxuICAgICAgICAgICAgRGF0YVBlcmlvZDogXCJEYXlcIixcbiAgICAgICAgICAgIEVsZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAgeyBTeW1ib2w6IGFyZ3MsIFR5cGU6IFwicHJpY2VcIiwgUGFyYW1zOiBbXCJvaGxjXCJdIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHF1ZXJ5U3RyaW5nID0gXCJwYXJhbWV0ZXJzPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHApKTtcbiAgICAgICAgdGhpcy5nZXRBc3luYyhcImpzb25wXCIsIHF1ZXJ5U3RyaW5nKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vIGZvcm1hdCBkYXRhXG4gICAgICAgICAgICB2YXIgY2hhcnREYXRhID0gX3RoaXMuZm9ybWF0TW9kZWwoYXJncywgZGF0YSk7XG4gICAgICAgICAgICAvLyBwYXNzIGNvbnRyb2wgdG8gdGhlIG1hcmtldCB2aWV3XG4gICAgICAgICAgICBfdGhpcy50cmlnZ2VyRXZlbnQobmV3IGZyYW1ld29ya18xLkFwcEV2ZW50KFwiYXBwLnZpZXcuY2hhcnQucmVuZGVyXCIsIGNoYXJ0RGF0YSwgbnVsbCkpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvLyBwYXNzIGNvbnRyb2wgdG8gdGhlIGdsb2JhbCBlcnJvciBoYW5kbGVyXG4gICAgICAgICAgICBfdGhpcy50cmlnZ2VyRXZlbnQobmV3IGZyYW1ld29ya18xLkFwcEV2ZW50KFwiYXBwLmVycm9yXCIsIGUsIG51bGwpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDaGFydE1vZGVsLnByb3RvdHlwZS5mb3JtYXRNb2RlbCA9IGZ1bmN0aW9uIChzeW1ib2wsIGRhdGEpIHtcbiAgICAgICAgdmFyIGNoYXJ0RGF0YSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBzeW1ib2wsXG4gICAgICAgICAgICBzZXJpZXM6IFtdXG4gICAgICAgIH07XG4gICAgICAgIHZhciBzZXJpZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJvcGVuXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YS5FbGVtZW50c1swXS5EYXRhU2VyaWVzLm9wZW4udmFsdWVzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiY2xvc2VcIixcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLkVsZW1lbnRzWzBdLkRhdGFTZXJpZXMuY2xvc2UudmFsdWVzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiaGlnaFwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuRWxlbWVudHNbMF0uRGF0YVNlcmllcy5oaWdoLnZhbHVlc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcImxvd1wiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuRWxlbWVudHNbMF0uRGF0YVNlcmllcy5sb3cudmFsdWVzXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc2VyaWUgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogc2VyaWVzW2ldLm5hbWUsXG4gICAgICAgICAgICAgICAgZGF0YTogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlcmllc1tpXS5kYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IHNlcmllc1tpXS5kYXRhW2pdO1xuICAgICAgICAgICAgICAgIHZhciBkID0gbmV3IERhdGUoZGF0YS5EYXRlc1tqXSkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIHNlcmllLmRhdGEucHVzaChbZCwgdmFsXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGFydERhdGEuc2VyaWVzLnB1c2goc2VyaWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGFydERhdGE7XG4gICAgfTtcbiAgICBDaGFydE1vZGVsID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGZyYW1ld29ya18xLk1vZGVsU2V0dGluZ3MoXCJodHRwOi8vZGV2Lm1hcmtpdG9uZGVtYW5kLmNvbS9BcGkvdjIvSW50ZXJhY3RpdmVDaGFydC9qc29ucFwiKVxuICAgIF0sIENoYXJ0TW9kZWwpO1xuICAgIHJldHVybiBDaGFydE1vZGVsO1xufShmcmFtZXdvcmtfMS5Nb2RlbCkpO1xuZXhwb3J0cy5DaGFydE1vZGVsID0gQ2hhcnRNb2RlbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2ZyYW1ld29yay9mcmFtZXdvcmsudHNcIiAvPlxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZnJhbWV3b3JrXzEgPSByZXF1aXJlKFwiLi4vLi4vZnJhbWV3b3JrL2ZyYW1ld29ya1wiKTtcbnZhciBOYXNkYXFNb2RlbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTmFzZGFxTW9kZWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTmFzZGFxTW9kZWwobWVkaWF0b3IpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIG1lZGlhdG9yKSB8fCB0aGlzO1xuICAgIH1cbiAgICBOYXNkYXFNb2RlbC5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0V2ZW50cyhbXG4gICAgICAgICAgICBuZXcgZnJhbWV3b3JrXzEuQXBwRXZlbnQoXCJhcHAubW9kZWwubmFzZGFxLmNoYW5nZVwiLCBudWxsLCBmdW5jdGlvbiAoZSwgYXJncykgeyBfdGhpcy5vbkNoYW5nZShhcmdzKTsgfSlcbiAgICAgICAgXSk7XG4gICAgfTtcbiAgICAvLyBkaXNwb3NlIG1vZGVsIGV2ZW50c1xuICAgIE5hc2RhcU1vZGVsLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlVG9FdmVudHMoKTtcbiAgICB9O1xuICAgIE5hc2RhcU1vZGVsLnByb3RvdHlwZS5vbkNoYW5nZSA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuZ2V0QXN5bmMoXCJqc29uXCIsIGFyZ3MpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8gZm9ybWF0IGRhdGFcbiAgICAgICAgICAgIHZhciBzdG9ja3MgPSB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IGRhdGEsXG4gICAgICAgICAgICAgICAgbWFya2V0OiBcIk5BU0RBUVwiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gcGFzcyBjb250cm9sIHRvIHRoZSBtYXJrZXQgdmlld1xuICAgICAgICAgICAgX3RoaXMudHJpZ2dlckV2ZW50KG5ldyBmcmFtZXdvcmtfMS5BcHBFdmVudChcImFwcC52aWV3Lm1hcmtldC5yZW5kZXJcIiwgc3RvY2tzLCBudWxsKSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIC8vIHBhc3MgY29udHJvbCB0byB0aGUgZ2xvYmFsIGVycm9yIGhhbmRsZXJcbiAgICAgICAgICAgIF90aGlzLnRyaWdnZXJFdmVudChuZXcgZnJhbWV3b3JrXzEuQXBwRXZlbnQoXCJhcHAuZXJyb3JcIiwgZSwgbnVsbCkpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE5hc2RhcU1vZGVsID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGZyYW1ld29ya18xLk1vZGVsU2V0dGluZ3MoXCIuL2RhdGEvbmFzZGFxLmpzb25cIilcbiAgICBdLCBOYXNkYXFNb2RlbCk7XG4gICAgcmV0dXJuIE5hc2RhcU1vZGVsO1xufShmcmFtZXdvcmtfMS5Nb2RlbCkpO1xuZXhwb3J0cy5OYXNkYXFNb2RlbCA9IE5hc2RhcU1vZGVsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZnJhbWV3b3JrL2ZyYW1ld29yay50c1wiIC8+XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBmcmFtZXdvcmtfMSA9IHJlcXVpcmUoXCIuLi8uLi9mcmFtZXdvcmsvZnJhbWV3b3JrXCIpO1xudmFyIE55c2VNb2RlbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTnlzZU1vZGVsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE55c2VNb2RlbChtZWRpYXRvcikge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgbWVkaWF0b3IpIHx8IHRoaXM7XG4gICAgfVxuICAgIE55c2VNb2RlbC5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0V2ZW50cyhbXG4gICAgICAgICAgICBuZXcgZnJhbWV3b3JrXzEuQXBwRXZlbnQoXCJhcHAubW9kZWwubnlzZS5jaGFuZ2VcIiwgbnVsbCwgZnVuY3Rpb24gKGUsIGFyZ3MpIHsgX3RoaXMub25DaGFuZ2UoYXJncyk7IH0pXG4gICAgICAgIF0pO1xuICAgIH07XG4gICAgLy8gZGlzcG9zZSBtb2RlbCBldmVudHNcbiAgICBOeXNlTW9kZWwucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVUb0V2ZW50cygpO1xuICAgIH07XG4gICAgTnlzZU1vZGVsLnByb3RvdHlwZS5vbkNoYW5nZSA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuZ2V0QXN5bmMoXCJqc29uXCIsIGFyZ3MpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8gZm9ybWF0IGRhdGFcbiAgICAgICAgICAgIHZhciBzdG9ja3MgPSB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IGRhdGEsXG4gICAgICAgICAgICAgICAgbWFya2V0OiBcIk5ZU0VcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIHBhc3MgY29udHJvbCB0byB0aGUgbWFya2V0IHZpZXdcbiAgICAgICAgICAgIF90aGlzLnRyaWdnZXJFdmVudChuZXcgZnJhbWV3b3JrXzEuQXBwRXZlbnQoXCJhcHAudmlldy5tYXJrZXQucmVuZGVyXCIsIHN0b2NrcywgbnVsbCkpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvLyBwYXNzIGNvbnRyb2wgdG8gdGhlIGdsb2JhbCBlcnJvciBoYW5kbGVyXG4gICAgICAgICAgICBfdGhpcy50cmlnZ2VyRXZlbnQobmV3IGZyYW1ld29ya18xLkFwcEV2ZW50KFwiYXBwLmVycm9yXCIsIGUsIG51bGwpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBOeXNlTW9kZWwgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgZnJhbWV3b3JrXzEuTW9kZWxTZXR0aW5ncyhcIi4vZGF0YS9ueXNlLmpzb25cIilcbiAgICBdLCBOeXNlTW9kZWwpO1xuICAgIHJldHVybiBOeXNlTW9kZWw7XG59KGZyYW1ld29ya18xLk1vZGVsKSk7XG5leHBvcnRzLk55c2VNb2RlbCA9IE55c2VNb2RlbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2ZyYW1ld29yay9pbnRlcmZhY2VzLnRzXCIgLz5cbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGZyYW1ld29ya18xID0gcmVxdWlyZShcIi4uLy4uL2ZyYW1ld29yay9mcmFtZXdvcmtcIik7XG52YXIgUXVvdGVNb2RlbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUXVvdGVNb2RlbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBRdW90ZU1vZGVsKG1lZGlhdG9yKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBtZWRpYXRvcikgfHwgdGhpcztcbiAgICB9XG4gICAgLy8gbGlzdGVuIHRvIG1vZGVsIGV2ZW50c1xuICAgIFF1b3RlTW9kZWwucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9FdmVudHMoW1xuICAgICAgICAgICAgbmV3IGZyYW1ld29ya18xLkFwcEV2ZW50KFwiYXBwLm1vZGVsLnF1b3RlLmNoYW5nZVwiLCBudWxsLCBmdW5jdGlvbiAoZSwgYXJncykge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uQ2hhbmdlKGFyZ3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgXSk7XG4gICAgfTtcbiAgICAvLyBkaXNwb3NlIG1vZGVsIGV2ZW50c1xuICAgIFF1b3RlTW9kZWwucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVUb0V2ZW50cygpO1xuICAgIH07XG4gICAgUXVvdGVNb2RlbC5wcm90b3R5cGUub25DaGFuZ2UgPSBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBmb3JtYXQgYXJnc1xuICAgICAgICB2YXIgcyA9IHsgc3ltYm9sOiBhcmdzIH07XG4gICAgICAgIHRoaXMuZ2V0QXN5bmMoXCJqc29ucFwiLCBzKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vIGZvcm1hdCBkYXRhXG4gICAgICAgICAgICB2YXIgcXVvdGUgPSBfdGhpcy5mb3JtYXRNb2RlbChkYXRhKTtcbiAgICAgICAgICAgIC8vIHBhc3MgY29udHJvbCB0byB0aGUgbWFya2V0IHZpZXdcbiAgICAgICAgICAgIF90aGlzLnRyaWdnZXJFdmVudChuZXcgZnJhbWV3b3JrXzEuQXBwRXZlbnQoXCJhcHAudmlldy5zeW1ib2wucmVuZGVyXCIsIHF1b3RlLCBudWxsKSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIC8vIHBhc3MgY29udHJvbCB0byB0aGUgZ2xvYmFsIGVycm9yIGhhbmRsZXJcbiAgICAgICAgICAgIF90aGlzLnRyaWdnZXJFdmVudChuZXcgZnJhbWV3b3JrXzEuQXBwRXZlbnQoXCJhcHAuZXJyb3JcIiwgZSwgbnVsbCkpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFF1b3RlTW9kZWwucHJvdG90eXBlLmZvcm1hdE1vZGVsID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgZGF0YS5DaGFuZ2UgPSBkYXRhLkNoYW5nZS50b0ZpeGVkKDIpO1xuICAgICAgICBkYXRhLkNoYW5nZVBlcmNlbnQgPSBkYXRhLkNoYW5nZVBlcmNlbnQudG9GaXhlZCgyKTtcbiAgICAgICAgZGF0YS5UaW1lc3RhbXAgPSBuZXcgRGF0ZShkYXRhLlRpbWVzdGFtcCkudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgICAgIGRhdGEuTWFya2V0Q2FwID0gKGRhdGEuTWFya2V0Q2FwIC8gMTAwMDAwMCkudG9GaXhlZCgyKSArIFwiTS5cIjtcbiAgICAgICAgZGF0YS5DaGFuZ2VQZXJjZW50WVREID0gZGF0YS5DaGFuZ2VQZXJjZW50WVRELnRvRml4ZWQoMik7XG4gICAgICAgIHJldHVybiB7IHF1b3RlOiBkYXRhIH07XG4gICAgfTtcbiAgICBRdW90ZU1vZGVsID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGZyYW1ld29ya18xLk1vZGVsU2V0dGluZ3MoXCJodHRwOi8vZGV2Lm1hcmtpdG9uZGVtYW5kLmNvbS9BcGkvdjIvUXVvdGUvanNvbnBcIilcbiAgICBdLCBRdW90ZU1vZGVsKTtcbiAgICByZXR1cm4gUXVvdGVNb2RlbDtcbn0oZnJhbWV3b3JrXzEuTW9kZWwpKTtcbmV4cG9ydHMuUXVvdGVNb2RlbCA9IFF1b3RlTW9kZWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9mcmFtZXdvcmsvZnJhbWV3b3JrLnRzXCIgLz5cbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGZyYW1ld29ya18xID0gcmVxdWlyZShcIi4uLy4uL2ZyYW1ld29yay9mcmFtZXdvcmtcIik7XG52YXIgQ2hhcnRWaWV3ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDaGFydFZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2hhcnRWaWV3KG1lZGlhdG9yKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBtZWRpYXRvcikgfHwgdGhpcztcbiAgICB9XG4gICAgQ2hhcnRWaWV3LnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnN1YnNjcmliZVRvRXZlbnRzKFtcbiAgICAgICAgICAgIG5ldyBmcmFtZXdvcmtfMS5BcHBFdmVudChcImFwcC52aWV3LmNoYXJ0LnJlbmRlclwiLCBudWxsLCBmdW5jdGlvbiAoZSwgbW9kZWwpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXJDaGFydChtb2RlbCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuYmluZERvbUV2ZW50cyhtb2RlbCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICBdKTtcbiAgICB9O1xuICAgIENoYXJ0Vmlldy5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy51bmJpbmREb21FdmVudHMoKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZVRvRXZlbnRzKCk7XG4gICAgfTtcbiAgICAvLyBpbml0aWFsaXplcyBET00gRXZlbnRzXG4gICAgQ2hhcnRWaWV3LnByb3RvdHlwZS5iaW5kRG9tRXZlbnRzID0gZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgIHZhciBzY29wZSA9ICQodGhpcy5fY29udGFpbmVyKTtcbiAgICAgICAgLy8gc2V0IERPTSBldmVudHMgaGVyZVxuICAgIH07XG4gICAgLy8gZGlzcG9zZXMgRE9NIGV2ZW50c1xuICAgIENoYXJ0Vmlldy5wcm90b3R5cGUudW5iaW5kRG9tRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2NvcGUgPSB0aGlzLl9jb250YWluZXI7XG4gICAgICAgIC8vIGtpbGwgRE9NIGV2ZW50cyBoZXJlXG4gICAgfTtcbiAgICBDaGFydFZpZXcucHJvdG90eXBlLnJlbmRlckNoYXJ0ID0gZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgICQodGhpcy5fY29udGFpbmVyKS5oaWdoY2hhcnRzKHtcbiAgICAgICAgICAgIGNoYXJ0OiB7XG4gICAgICAgICAgICAgICAgem9vbVR5cGU6ICd4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICAgICAgdGV4dDogbW9kZWwudGl0bGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWJ0aXRsZToge1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiQ2xpY2sgYW5kIGRyYWcgaW4gdGhlIHBsb3QgYXJlYSB0byB6b29tIGluXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4QXhpczoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdkYXRldGltZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB5QXhpczoge1xuICAgICAgICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdQcmljZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICAgICAgICBzaGFyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY3Jvc3NoYWlyczogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBsb3RPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgYXJlYToge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGl1czogMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDAuMSxcbiAgICAgICAgICAgICAgICAgICAgdGhyZXNob2xkOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlcmllczogbW9kZWwuc2VyaWVzXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2hhcnRWaWV3ID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGZyYW1ld29ya18xLlZpZXdTZXR0aW5ncyhudWxsLCBcIiNjaGFydF9jb250YWluZXJcIilcbiAgICBdLCBDaGFydFZpZXcpO1xuICAgIHJldHVybiBDaGFydFZpZXc7XG59KGZyYW1ld29ya18xLlZpZXcpKTtcbmV4cG9ydHMuQ2hhcnRWaWV3ID0gQ2hhcnRWaWV3O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZnJhbWV3b3JrL2luZmVyZmFjZXNcIiAvPlxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZnJhbWV3b3JrXzEgPSByZXF1aXJlKFwiLi4vLi4vZnJhbWV3b3JrL2ZyYW1ld29ya1wiKTtcbnZhciBNYXJrZXRWaWV3ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYXJrZXRWaWV3LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1hcmtldFZpZXcobWVkaWF0b3IpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIG1lZGlhdG9yKSB8fCB0aGlzO1xuICAgIH1cbiAgICBNYXJrZXRWaWV3LnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnN1YnNjcmliZVRvRXZlbnRzKFtcbiAgICAgICAgICAgIG5ldyBmcmFtZXdvcmtfMS5BcHBFdmVudChcImFwcC52aWV3Lm1hcmtldC5yZW5kZXJcIiwgbnVsbCwgZnVuY3Rpb24gKGUsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXJBc3luYyhhcmdzKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0IERPTSBldmVudHNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYmluZERvbUV2ZW50cyhtb2RlbCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBhc3MgY29udHJvbCB0byB0aGUgZ2xvYmFsIGVycm9yIGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudHJpZ2dlckV2ZW50KG5ldyBmcmFtZXdvcmtfMS5BcHBFdmVudChcImFwcC5lcnJvclwiLCBlLCBudWxsKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXSk7XG4gICAgfTtcbiAgICBNYXJrZXRWaWV3LnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnVuYmluZERvbUV2ZW50cygpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlVG9FdmVudHMoKTtcbiAgICB9O1xuICAgIC8vIGluaXRpYWxpemUgRE9NIGV2ZW50c1xuICAgIE1hcmtldFZpZXcucHJvdG90eXBlLmJpbmREb21FdmVudHMgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHNjb3BlID0gJCh0aGlzLl9jb250YWluZXIpO1xuICAgICAgICAvLyBoYW5kbGUgY2xpY2sgb24gXCJxdW90ZVwiIGJ1dHRvblxuICAgICAgICAkKFwiLmdldFF1b3RlXCIpLm9uKFwiY2xpY2tcIiwgc2NvcGUsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgc3ltYm9sID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3N5bWJvbCcpO1xuICAgICAgICAgICAgX3RoaXMuZ2V0U3RvY2tRdW90ZShzeW1ib2wpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbWFrZSB0YWJsZSBzb3J0YWJsZSBhbmQgc2VhcmNoYWJsZVxuICAgICAgICAkKHNjb3BlKS5maW5kKFwidGFibGVcIikuRGF0YVRhYmxlKCk7XG4gICAgfTtcbiAgICAvLyBkaXNwb3NlcyBET00gZXZlbnRzXG4gICAgTWFya2V0Vmlldy5wcm90b3R5cGUudW5iaW5kRG9tRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2NvcGUgPSB0aGlzLl9jb250YWluZXI7XG4gICAgICAgICQoXCIuZ2V0UXVvdGVcIikub2ZmKFwiY2xpY2tcIiwgc2NvcGUpO1xuICAgICAgICB2YXIgdGFibGUgPSAkKHNjb3BlKS5maW5kKFwidGFibGVcIikuRGF0YVRhYmxlKCk7XG4gICAgICAgIHRhYmxlLmRlc3Ryb3koKTtcbiAgICB9O1xuICAgIE1hcmtldFZpZXcucHJvdG90eXBlLmdldFN0b2NrUXVvdGUgPSBmdW5jdGlvbiAoc3ltYm9sKSB7XG4gICAgICAgIC8vIG5hdmlnYXRlIHRvIHJvdXRlIHVzaW5nIHJvdXRlIGV2ZW50XG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG5ldyBmcmFtZXdvcmtfMS5BcHBFdmVudChcImFwcC5yb3V0ZVwiLCBuZXcgZnJhbWV3b3JrXzEuUm91dGUoXCJzeW1ib2xcIiwgXCJxdW90ZVwiLCBbc3ltYm9sXSksIG51bGwpKTtcbiAgICB9O1xuICAgIE1hcmtldFZpZXcgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgZnJhbWV3b3JrXzEuVmlld1NldHRpbmdzKFwiLi9zb3VyY2UvYXBwL3RlbXBsYXRlcy9tYXJrZXQuaGJzXCIsIFwiI291dGxldFwiKVxuICAgIF0sIE1hcmtldFZpZXcpO1xuICAgIHJldHVybiBNYXJrZXRWaWV3O1xufShmcmFtZXdvcmtfMS5WaWV3KSk7XG5leHBvcnRzLk1hcmtldFZpZXcgPSBNYXJrZXRWaWV3O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZnJhbWV3b3JrL2ZyYW1ld29yay50c1wiIC8+XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBmcmFtZXdvcmtfMSA9IHJlcXVpcmUoXCIuLi8uLi9mcmFtZXdvcmsvZnJhbWV3b3JrXCIpO1xudmFyIFN5bWJvbFZpZXcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN5bWJvbFZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3ltYm9sVmlldyhtZWRpYXRvcikge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgbWVkaWF0b3IpIHx8IHRoaXM7XG4gICAgfVxuICAgIFN5bWJvbFZpZXcucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9FdmVudHMoW1xuICAgICAgICAgICAgbmV3IGZyYW1ld29ya18xLkFwcEV2ZW50KFwiYXBwLnZpZXcuc3ltYm9sLnJlbmRlclwiLCBudWxsLCBmdW5jdGlvbiAoZSwgbW9kZWwpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW5kZXJBc3luYyhtb2RlbClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBET00gZXZlbnRzXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmJpbmREb21FdmVudHMobW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICAvLyBwYXNzIGNvbnRyb2wgdG8gY2hhcnQgdmlld1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy50cmlnZ2VyRXZlbnQobmV3IGZyYW1ld29ya18xLkFwcEV2ZW50KFwiYXBwLm1vZGVsLmNoYXJ0LmNoYW5nZVwiLCBtb2RlbC5xdW90ZS5TeW1ib2wsIG51bGwpKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudHJpZ2dlckV2ZW50KG5ldyBmcmFtZXdvcmtfMS5BcHBFdmVudChcImFwcC5lcnJvclwiLCBlLCBudWxsKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICBdKTtcbiAgICB9O1xuICAgIFN5bWJvbFZpZXcucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudW5iaW5kRG9tRXZlbnRzKCk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmVUb0V2ZW50cygpO1xuICAgIH07XG4gICAgLy8gaW5pdGlhbGl6ZXMgRE9NIGV2ZW50c1xuICAgIFN5bWJvbFZpZXcucHJvdG90eXBlLmJpbmREb21FdmVudHMgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgdmFyIHNjb3BlID0gJCh0aGlzLl9jb250YWluZXIpO1xuICAgICAgICAvLyBzZXQgRE9NIGV2ZW50cyBoZXJlXG4gICAgfTtcbiAgICAvLyBkaXNwb3NlcyBET00gZXZlbnRzXG4gICAgU3ltYm9sVmlldy5wcm90b3R5cGUudW5iaW5kRG9tRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2NvcGUgPSB0aGlzLl9jb250YWluZXI7XG4gICAgICAgIC8vIGtpbGwgRE9NIGV2ZW50cyBoZXJlXG4gICAgfTtcbiAgICBTeW1ib2xWaWV3ID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGZyYW1ld29ya18xLlZpZXdTZXR0aW5ncyhcIi4vc291cmNlL2FwcC90ZW1wbGF0ZXMvc3ltYm9sLmhic1wiLCBcIiNvdXRsZXRcIilcbiAgICBdLCBTeW1ib2xWaWV3KTtcbiAgICByZXR1cm4gU3ltYm9sVmlldztcbn0oZnJhbWV3b3JrXzEuVmlldykpO1xuZXhwb3J0cy5TeW1ib2xWaWV3ID0gU3ltYm9sVmlldztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGRpc3BhdGNoZXJfMSA9IHJlcXVpcmUoXCIuL2Rpc3BhdGNoZXJcIik7XG52YXIgbWVkaWF0b3JfMSA9IHJlcXVpcmUoXCIuL21lZGlhdG9yXCIpO1xudmFyIGFwcF9ldmVudF8xID0gcmVxdWlyZShcIi4vYXBwX2V2ZW50XCIpO1xudmFyIHJvdXRlcl8xID0gcmVxdWlyZShcIi4vcm91dGVyXCIpO1xudmFyIEFwcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcHAoYXBwU2V0dGluZ3MpIHtcbiAgICAgICAgdGhpcy5fY29udHJvbGxlcnMgPSBhcHBTZXR0aW5ncy5jb250cm9sbGVycztcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBuZXcgbWVkaWF0b3JfMS5NZWRpYXRvcihhcHBTZXR0aW5ncy5pc0RlYnVnIHx8IGZhbHNlKTtcbiAgICAgICAgdGhpcy5fcm91dGVyID0gbmV3IHJvdXRlcl8xLlJvdXRlcih0aGlzLl9tZWRpYXRvciwgYXBwU2V0dGluZ3MuZGVmYXVsdENvbnRyb2xsZXIsIGFwcFNldHRpbmdzLmRlZmF1bHRBY3Rpb24pO1xuICAgICAgICB0aGlzLl9kaXNwYXRjaGVyID0gbmV3IGRpc3BhdGNoZXJfMS5EaXNwYXRjaGVyKHRoaXMuX21lZGlhdG9yLCB0aGlzLl9jb250cm9sbGVycyk7XG4gICAgICAgIHRoaXMuX29uRXJyb3JIYW5kbGVyID0gYXBwU2V0dGluZ3Mub25FcnJvckhhbmRsZXI7XG4gICAgfVxuICAgIEFwcC5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fcm91dGVyLmluaXRpYWxpemUoKTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5pbml0aWFsaXplKCk7XG4gICAgICAgIHRoaXMuX21lZGlhdG9yLnN1YnNjcmliZShuZXcgYXBwX2V2ZW50XzEuQXBwRXZlbnQoXCJhcHAuZXJyb3JcIiwgbnVsbCwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgIF90aGlzLl9vbkVycm9ySGFuZGxlcihkYXRhKTtcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgcmV0dXJuIEFwcDtcbn0oKSk7XG5leHBvcnRzLkFwcCA9IEFwcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEFwcEV2ZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwcEV2ZW50KHRvcGljLCBkYXRhLCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMudG9waWMgPSB0b3BpYztcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICB9XG4gICAgcmV0dXJuIEFwcEV2ZW50O1xufSgpKTtcbmV4cG9ydHMuQXBwRXZlbnQgPSBBcHBFdmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXZlbnRfZW1pdHRlcl8xID0gcmVxdWlyZShcIi4vZXZlbnRfZW1pdHRlclwiKTtcbnZhciBDb250cm9sbGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb250cm9sbGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbnRyb2xsZXIobWVkaWF0b3IpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIG1lZGlhdG9yKSB8fCB0aGlzO1xuICAgIH1cbiAgICBDb250cm9sbGVyLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRyb2xsZXIucHJvdG90eXBlLmluaXRpYWxpemUoKSBpcyBhYnN0cmFjdCB5b3UgbXVzdCBpbXBsZW1lbnQgaXQhJyk7XG4gICAgfTtcbiAgICBDb250cm9sbGVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRyb2xsZXIucHJvdG90eXBlLmRpc3Bvc2UoKSBpcyBhYnN0cmFjdCB5b3UgbXVzdCBpbXBsZW1lbnQgaXQhJyk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29udHJvbGxlcjtcbn0oZXZlbnRfZW1pdHRlcl8xLkV2ZW50RW1pdHRlcikpO1xuZXhwb3J0cy5Db250cm9sbGVyID0gQ29udHJvbGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZXZlbnRfZW1pdHRlcl8xID0gcmVxdWlyZShcIi4vZXZlbnRfZW1pdHRlclwiKTtcbnZhciBhcHBfZXZlbnRfMSA9IHJlcXVpcmUoXCIuL2FwcF9ldmVudFwiKTtcbnZhciBEaXNwYXRjaGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhEaXNwYXRjaGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERpc3BhdGNoZXIobWVkaWF0b3IsIGNvbnRyb2xsZXJzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG1lZGlhdG9yKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fY29udHJvbGxlcnNIYXNoTWFwID0gX3RoaXMuZ2V0Q29udHJvbGxlcihjb250cm9sbGVycyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLy8gbGlzdGVuIHRvIGFwcC5kaXNwYXRjaCBldmVudHNcbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnN1YnNjcmliZVRvRXZlbnRzKFtcbiAgICAgICAgICAgIG5ldyBhcHBfZXZlbnRfMS5BcHBFdmVudChcImFwcC5kaXNwYXRjaFwiLCBudWxsLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmRpc3BhdGNoKGRhdGEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgXSk7XG4gICAgfTtcbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5nZXRDb250cm9sbGVyID0gZnVuY3Rpb24gKGNvbnRyb2xsZXJzKSB7XG4gICAgICAgIHZhciBoYXNoTWFwLCBoYXNoTWFwRW50cnksIG5hbWUsIGNvbnRyb2xsZXIsIGw7XG4gICAgICAgIGhhc2hNYXAgPSB7fTtcbiAgICAgICAgbCA9IGNvbnRyb2xsZXJzLmxlbmd0aDtcbiAgICAgICAgaWYgKGwgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IGFwcF9ldmVudF8xLkFwcEV2ZW50KFwiYXBwLmVycm9yXCIsIFwiQ2Fubm90IGNyZWF0ZSBhbiBhcHBsaWNhdGlvbiB3aXRob3V0IGF0IGxlYXN0IG9uZSBjb250cm9sbGVyXCIsIG51bGwpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgY29udHJvbGxlciA9IGNvbnRyb2xsZXJzW2ldO1xuICAgICAgICAgICAgbmFtZSA9IGNvbnRyb2xsZXIuY29udHJvbGxlck5hbWU7XG4gICAgICAgICAgICBoYXNoTWFwRW50cnkgPSBoYXNoTWFwW25hbWVdO1xuICAgICAgICAgICAgaWYgKGhhc2hNYXBFbnRyeSAhPT0gbnVsbCAmJiBoYXNoTWFwRW50cnkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG5ldyBhcHBfZXZlbnRfMS5BcHBFdmVudChcImFwcC5lcnJvclwiLCBcIlR3byBjb250cm9sbGVyIGNhbm5vdCB1c2UgdGhlIHNhbWUgbmFtZVwiLCBudWxsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoYXNoTWFwW25hbWVdID0gY29udHJvbGxlci5jb250cm9sbGVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXNoTWFwO1xuICAgIH07XG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgdmFyIENvbnRyb2xsZXIgPSB0aGlzLl9jb250cm9sbGVyc0hhc2hNYXBbcm91dGUuY29udHJvbGxlck5hbWVdO1xuICAgICAgICAvLyB0cnkgdG8gZmluZCBjb250cm9sbGVyXG4gICAgICAgIGlmIChDb250cm9sbGVyID09PSBudWxsIHx8IENvbnRyb2xsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IGFwcF9ldmVudF8xLkFwcEV2ZW50KFwiYXBwLmVycm9yXCIsIFwiQ29udHJvbGxlciBub3QgZm91bmQ6IFwiICsgcm91dGUuY29udHJvbGxlck5hbWUsIG51bGwpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIGNvbnRyb2xsZXIgaW5zdGFuY2VcbiAgICAgICAgICAgIHZhciBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIodGhpcy5fbWVkaWF0b3IpO1xuICAgICAgICAgICAgLy8gYWN0aW9uIGlzIG5vdCBhdmFpbGFibGVcbiAgICAgICAgICAgIHZhciBhID0gY29udHJvbGxlcltyb3V0ZS5hY3Rpb25OYW1lXTtcbiAgICAgICAgICAgIGlmIChhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG5ldyBhcHBfZXZlbnRfMS5BcHBFdmVudChcImFwcC5lcnJvclwiLCBcIkFjdGlvbiBub3QgZm91bmQgaW4gY29udHJvbGxlcjogXCIgKyByb3V0ZS5jb250cm9sbGVyTmFtZSArIFwiIC0gKyBcIiArIHJvdXRlLmFjdGlvbk5hbWUsIG51bGwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGFjdGlvbiBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudENvbnRyb2xsZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpbml0aWFsaXplIGNvbnRyb2xsZXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENvbnRyb2xsZXJOYW1lID0gcm91dGUuY29udHJvbGxlck5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDb250cm9sbGVyID0gY29udHJvbGxlcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENvbnRyb2xsZXIuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGlzcG9zZSBwcmV2aW91cyBjb250cm9sbGVyIGlmIG5vdCBuZWVkZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRDb250cm9sbGVyTmFtZSAhPT0gcm91dGUuY29udHJvbGxlck5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDb250cm9sbGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDb250cm9sbGVyTmFtZSA9IHJvdXRlLmNvbnRyb2xsZXJOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENvbnRyb2xsZXIuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHBhc3MgZmxvdyBmcm9tIGRpc3BhdGNoZXIgdG8gdGhlIGNvbnRyb2xsZXJcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgYXBwX2V2ZW50XzEuQXBwRXZlbnQoXCJhcHAuY29udHJvbGxlci5cIiArIHRoaXMuX2N1cnJlbnRDb250cm9sbGVyTmFtZSArIFwiLlwiICsgcm91dGUuYWN0aW9uTmFtZSwgcm91dGUuYXJncywgbnVsbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRGlzcGF0Y2hlcjtcbn0oZXZlbnRfZW1pdHRlcl8xLkV2ZW50RW1pdHRlcikpO1xuZXhwb3J0cy5EaXNwYXRjaGVyID0gRGlzcGF0Y2hlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEV2ZW50RW1pdHRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIobWVkaWF0b3IpIHtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IgPSBtZWRpYXRvcjtcbiAgICB9XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS50cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fbWVkaWF0b3IucHVibGlzaChldmVudCk7XG4gICAgfTtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnN1YnNjcmliZVRvRXZlbnRzID0gZnVuY3Rpb24gKGV2ZW50cykge1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBldmVudHM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9tZWRpYXRvci5zdWJzY3JpYmUodGhpcy5fZXZlbnRzW2ldKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS51bnN1YnNjcmliZVRvRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2V2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fbWVkaWF0b3IudW5zdWJzY3JpYmUodGhpcy5fZXZlbnRzW2ldKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbn0oKSk7XG5leHBvcnRzLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGFwcF8xID0gcmVxdWlyZShcIi4vYXBwXCIpO1xuZXhwb3J0cy5BcHAgPSBhcHBfMS5BcHA7XG52YXIgcm91dGVfMSA9IHJlcXVpcmUoXCIuL3JvdXRlXCIpO1xuZXhwb3J0cy5Sb3V0ZSA9IHJvdXRlXzEuUm91dGU7XG52YXIgYXBwX2V2ZW50XzEgPSByZXF1aXJlKFwiLi9hcHBfZXZlbnRcIik7XG5leHBvcnRzLkFwcEV2ZW50ID0gYXBwX2V2ZW50XzEuQXBwRXZlbnQ7XG52YXIgY29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vY29udHJvbGxlclwiKTtcbmV4cG9ydHMuQ29udHJvbGxlciA9IGNvbnRyb2xsZXJfMS5Db250cm9sbGVyO1xudmFyIHZpZXdfMSA9IHJlcXVpcmUoXCIuL3ZpZXdcIik7XG5leHBvcnRzLlZpZXcgPSB2aWV3XzEuVmlldztcbmV4cG9ydHMuVmlld1NldHRpbmdzID0gdmlld18xLlZpZXdTZXR0aW5ncztcbnZhciBtb2RlbF8xID0gcmVxdWlyZShcIi4vbW9kZWxcIik7XG5leHBvcnRzLk1vZGVsID0gbW9kZWxfMS5Nb2RlbDtcbmV4cG9ydHMuTW9kZWxTZXR0aW5ncyA9IG1vZGVsXzEuTW9kZWxTZXR0aW5ncztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1lZGlhdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1lZGlhdG9yKGlzRGVidWcpIHtcbiAgICAgICAgaWYgKGlzRGVidWcgPT09IHZvaWQgMCkgeyBpc0RlYnVnID0gZmFsc2U7IH1cbiAgICAgICAgdGhpcy5fJCA9ICQoe30pO1xuICAgICAgICB0aGlzLl9pc0RlYnVnID0gaXNEZWJ1ZztcbiAgICB9XG4gICAgTWVkaWF0b3IucHJvdG90eXBlLnB1Ymxpc2ggPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAodGhpcy5faXNEZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3IERhdGUoKS5nZXRUaW1lKCksIFwiUFVCTElTSFwiLCBlLnRvcGljLCBlLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuXyQudHJpZ2dlcihlLnRvcGljLCBlLmRhdGEpO1xuICAgIH07XG4gICAgTWVkaWF0b3IucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0RlYnVnID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSwgXCJTVUJTQ1JJQkVcIiwgZS50b3BpYywgZS5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl8kLm9uKGUudG9waWMsIGUuaGFuZGxlcik7XG4gICAgfTtcbiAgICBNZWRpYXRvci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAodGhpcy5faXNEZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3IERhdGUoKS5nZXRUaW1lKCksIFwiVU5TVUJTQ1JJQkVcIiwgZS50b3BpYywgZS5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl8kLm9mZihlLnRvcGljKTtcbiAgICB9O1xuICAgIHJldHVybiBNZWRpYXRvcjtcbn0oKSk7XG5leHBvcnRzLk1lZGlhdG9yID0gTWVkaWF0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGV2ZW50X2VtaXR0ZXJfMSA9IHJlcXVpcmUoXCIuL2V2ZW50X2VtaXR0ZXJcIik7XG5mdW5jdGlvbiBNb2RlbFNldHRpbmdzKHNlcnZpY2VVcmwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAvLyBzYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCBjb25zdHJ1Y3RvclxuICAgICAgICB2YXIgb3JpZ2luYWwgPSB0YXJnZXQ7XG4gICAgICAgIC8vIGEgdXRpdGlseSBmdWNudGlvbiB0byBnZW5lcmF0ZSBpbnN0YW5jZXMgb2YgYSBjbGFzc1xuICAgICAgICBmdW5jdGlvbiBjb25zdHJ1Y3QoY29uc3RydWN0b3IsIGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBjID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjLnByb3RvdHlwZSA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBjKCk7XG4gICAgICAgICAgICBpbnN0YW5jZS5fc2VydmljZVVybCA9IHNlcnZpY2VVcmw7XG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhlIG5ldyBjb25zdHJ1Y3RvciBiZWhhdmlvclxuICAgICAgICB2YXIgZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Qob3JpZ2luYWwsIGFyZ3MpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBjb3B5IHByb3RvdHlwZSBzbyBpbnN0YW5jZW9mIG9wZXJhdG9yIHN0aWxsIHdvcmtzXG4gICAgICAgIGYucHJvdG90eXBlIC0gb3JpZ2luYWwucHJvdG90eXBlO1xuICAgICAgICAvLyByZXR1cm4gbmV3IGNvbnN0cnVjdG9yICggd2lsbCBvdmVycmlkZSBvcmlnaW5hbCApXG4gICAgICAgIHJldHVybiBmO1xuICAgIH07XG59XG5leHBvcnRzLk1vZGVsU2V0dGluZ3MgPSBNb2RlbFNldHRpbmdzO1xudmFyIE1vZGVsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNb2RlbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNb2RlbChtZWRpYXRvcikge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgbWVkaWF0b3IpIHx8IHRoaXM7XG4gICAgfVxuICAgIC8vIG11c3QgYmUgaW1wbGVtZW50ZWQgYnkgZGVyaXZlZCBjbGFzc2VzXG4gICAgTW9kZWwucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1vZGVsLnByb3RvdHlwZS5pbml0aWxpemUoKSBpcyBhYnN0cmFjdCBhbmQgbXVzdCBpbXBsZW1lbnRlZC5cIik7XG4gICAgfTtcbiAgICAvLyBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IGRlcml2ZWQgY2xhc3Nlc1xuICAgIE1vZGVsLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLnByb3RvdHlwZS5kaXNwb3NlKCkgaXMgYWJzdHJhY3QgYW5kIG11c3QgaW1wbGVtZW50ZWQnKTtcbiAgICB9O1xuICAgIE1vZGVsLnByb3RvdHlwZS5yZXF1ZXN0QXN5bmMgPSBmdW5jdGlvbiAobWV0aG9kLCBkYXRhVHlwZSwgZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gUS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgdXJsOiBfdGhpcy5fc2VydmljZVVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhIHx8IHt9LFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBkYXRhVHlwZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNb2RlbC5wcm90b3R5cGUuZ2V0QXN5bmMgPSBmdW5jdGlvbiAoZGF0YVR5cGUsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFzeW5jKFwiR0VUXCIsIGRhdGFUeXBlLCBkYXRhKTtcbiAgICB9O1xuICAgIE1vZGVsLnByb3RvdHlwZS5wb3N0QXN5bmMgPSBmdW5jdGlvbiAoZGF0YVR5cGUsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFzeW5jKFwiUE9TVFwiLCBkYXRhVHlwZSwgZGF0YSk7XG4gICAgfTtcbiAgICBNb2RlbC5wcm90b3R5cGUucHV0QXN5bmMgPSBmdW5jdGlvbiAoZGF0YVR5cGUsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEFzeW5jKFwiUFVUXCIsIGRhdGFUeXBlLCBkYXRhKTtcbiAgICB9O1xuICAgIE1vZGVsLnByb3RvdHlwZS5kZWxldGVBc3luYyA9IGZ1bmN0aW9uIChkYXRhVHlwZSwgZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0QXN5bmMoXCJERUxFVEVcIiwgZGF0YVR5cGUsIGRhdGEpO1xuICAgIH07XG4gICAgcmV0dXJuIE1vZGVsO1xufShldmVudF9lbWl0dGVyXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLk1vZGVsID0gTW9kZWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBSb3V0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSb3V0ZShjb250cm9sbGVyTmFtZSwgYWN0aW9uTmFtZSwgYXJncykge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJOYW1lID0gY29udHJvbGxlck5hbWU7XG4gICAgICAgIHRoaXMuYWN0aW9uTmFtZSA9IGFjdGlvbk5hbWU7XG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgfVxuICAgIFJvdXRlLnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzLCBzYXJncztcbiAgICAgICAgc2FyZ3MgPSB0aGlzLmFyZ3MubWFwKGZ1bmN0aW9uIChhKSB7IHJldHVybiBhLnRvU3RyaW5nKCk7IH0pLmpvaW4oXCIvXCIpO1xuICAgICAgICBzID0gdGhpcy5jb250cm9sbGVyTmFtZSArIFwiL1wiICsgdGhpcy5hY3Rpb25OYW1lICsgXCIvXCIgKyBzYXJncztcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfTtcbiAgICByZXR1cm4gUm91dGU7XG59KCkpO1xuZXhwb3J0cy5Sb3V0ZSA9IFJvdXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBldmVudF9lbWl0dGVyXzEgPSByZXF1aXJlKFwiLi9ldmVudF9lbWl0dGVyXCIpO1xudmFyIGFwcF9ldmVudF8xID0gcmVxdWlyZShcIi4vYXBwX2V2ZW50XCIpO1xudmFyIHJvdXRlXzEgPSByZXF1aXJlKFwiLi9yb3V0ZVwiKTtcbnZhciBSb3V0ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJvdXRlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSb3V0ZXIobWVkaWF0b3IsIGRlZmF1bHRDb250cm9sbGVyLCBkZWZhdWx0QWN0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG1lZGlhdG9yKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5fZGVmYXVsdENvbnRyb2xsZXIgPSBkZWZhdWx0Q29udHJvbGxlciB8fCBcImhvbWVcIjtcbiAgICAgICAgX3RoaXMuX2RlZmF1bHRBY3Rpb24gPSBkZWZhdWx0QWN0aW9uIHx8IFwiaW5kZXhcIjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBSb3V0ZXIucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIG9ic2VydmUgVVJMIGNoYW5nZXMgYnkgdXNlcnNcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHIgPSBfdGhpcy5nZXRSb3V0ZSgpO1xuICAgICAgICAgICAgX3RoaXMub25Sb3V0ZUNoYW5nZShyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGJlIGFibGUgdG8gdHJpZ2dlciBVUkwgY2hhbmdlc1xuICAgICAgICB0aGlzLnN1YnNjcmliZVRvRXZlbnRzKFtcbiAgICAgICAgICAgIG5ldyBhcHBfZXZlbnRfMS5BcHBFdmVudChcImFwcC5pbml0aWFsaXplXCIsIG51bGwsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25Sb3V0ZUNoYW5nZShfdGhpcy5nZXRSb3V0ZSgpKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IGFwcF9ldmVudF8xLkFwcEV2ZW50KFwiYXBwLnJvdXRlXCIsIG51bGwsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0Um91dGUoZGF0YSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXSk7XG4gICAgfTtcbiAgICAvLyBFbmNhcHN1bGF0ZXMgcmVhZGluZyB0aGUgVVJMXG4gICAgUm91dGVyLnByb3RvdHlwZS5nZXRSb3V0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VSb3V0ZShoKTtcbiAgICB9O1xuICAgIC8vIEVuY2Fwc3VsYXRlcyB3cml0aW5nIHRoZSBVUkxcbiAgICBSb3V0ZXIucHJvdG90eXBlLnNldFJvdXRlID0gZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgIHZhciBzID0gcm91dGUuc2VyaWFsaXplKCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcztcbiAgICB9O1xuICAgIC8vIEVuY2Fwc3VsYXRlcyBwYXJzaW5nIGFuIFVSTFxuICAgIFJvdXRlci5wcm90b3R5cGUucGFyc2VSb3V0ZSA9IGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgICAgIHZhciBjb21wLCBjb250cm9sbGVyLCBhY3Rpb24sIGFyZ3MsIGk7XG4gICAgICAgIGlmIChoYXNoW2hhc2gubGVuZ3RoIC0gMV0gPT09IFwiL1wiKSB7XG4gICAgICAgICAgICBoYXNoID0gaGFzaC5zdWJzdHJpbmcoMCwgaGFzaC5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBjb21wID0gaGFzaC5yZXBsYWNlKFwiI1wiLCAnJykuc3BsaXQoXCIvXCIpO1xuICAgICAgICBjb250cm9sbGVyID0gY29tcFswXSB8fCB0aGlzLl9kZWZhdWx0Q29udHJvbGxlcjtcbiAgICAgICAgYWN0aW9uID0gY29tcFsxXSB8fCB0aGlzLl9kZWZhdWx0QWN0aW9uO1xuICAgICAgICBhcmdzID0gW107XG4gICAgICAgIGZvciAoaSA9IDI7IGkgPCBjb21wLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzLnB1c2goY29tcFtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyByb3V0ZV8xLlJvdXRlKGNvbnRyb2xsZXIsIGFjdGlvbiwgYXJncyk7XG4gICAgfTtcbiAgICAvLyBQYXNzIGNvbnRyb2wgdG8gdGhlIERpc3BhdGNoZXIgdmlhIHRoZSBNZWRpYXRvclxuICAgIFJvdXRlci5wcm90b3R5cGUub25Sb3V0ZUNoYW5nZSA9IGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgYXBwX2V2ZW50XzEuQXBwRXZlbnQoXCJhcHAuZGlzcGF0Y2hcIiwgcm91dGUsIG51bGwpKTtcbiAgICB9O1xuICAgIHJldHVybiBSb3V0ZXI7XG59KGV2ZW50X2VtaXR0ZXJfMS5FdmVudEVtaXR0ZXIpKTtcbmV4cG9ydHMuUm91dGVyID0gUm91dGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBldmVudF9lbWl0dGVyXzEgPSByZXF1aXJlKFwiLi9ldmVudF9lbWl0dGVyXCIpO1xuZnVuY3Rpb24gVmlld1NldHRpbmdzKHRlbXBsYXRlVXJsLCBjb250YWluZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICB2YXIgb3JpZ2luYWwgPSB0YXJnZXQ7XG4gICAgICAgIGZ1bmN0aW9uIGNvbnN0cnVjdChjb25zdHJ1Y3RvciwgYXJncykge1xuICAgICAgICAgICAgdmFyIGMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGMucHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gbmV3IGMoKTtcbiAgICAgICAgICAgIGluc3RhbmNlLl9jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgICAgICBpbnN0YW5jZS5fdGVtcGxhdGVVcmwgPSB0ZW1wbGF0ZVVybDtcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Qob3JpZ2luYWwsIGFyZ3MpO1xuICAgICAgICB9O1xuICAgICAgICBmLnByb3RvdHlwZSA9IG9yaWdpbmFsLnByb3RvdHlwZTtcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgfTtcbn1cbmV4cG9ydHMuVmlld1NldHRpbmdzID0gVmlld1NldHRpbmdzO1xudmFyIFZpZXcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFZpZXcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVmlldyhtZWRpYXRvcikge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgbWVkaWF0b3IpIHx8IHRoaXM7XG4gICAgfVxuICAgIC8vIG11c3QgYmUgaW1wbGVtZW50ZWQgYnkgZGVyaXZlZCBjbGFzc2VzXG4gICAgVmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZSgpIGlzIGFic3RyYWN0IGFuZCBtdXN0IGJlIGltcGxlbWVudGVkLlwiKTtcbiAgICB9O1xuICAgIC8vIG11c3QgYmUgaW1wbGVtZW50ZWQgYnkgZGVyaXZlZCBjbGFzc2VzXG4gICAgVmlldy5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVmlldy5wcm90b3R5cGUuZGlzcG9zZSgpIGlzIGFic3RyYWN0IGFuZCBtdXN0IGJlIGltcGxlbWVudGVkLlwiKTtcbiAgICB9O1xuICAgIC8vIG11c3QgYmUgaW1wbGVtZW50ZWQgYnkgZGVyaXZlZCBjbGFzc2VzXG4gICAgVmlldy5wcm90b3R5cGUuYmluZERvbUV2ZW50cyA9IGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZpZXcucHJvdG90eXBlLmJpbmREb21FdmVudHMoKSBpcyBhYnN0cmFjdCBhbmQgbXVzdCBiZSBpbXBsZW1lbnRlZC4nKTtcbiAgICB9O1xuICAgIC8vIG11c3QgYmUgaW1wbGVtZW50ZWQgYnkgZGVyaXZlZCBjbGFzc2VzXG4gICAgVmlldy5wcm90b3R5cGUudW5iaW5kRG9tRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZpZXcucHJvdG90eXBlLnVuYmluZERvbUV2ZW50cygpIGlzIGFic3RyYWN0IGFuZCBtdXN0IGJlIGltcGxlbWVudGVkJyk7XG4gICAgfTtcbiAgICAvLyBhc3luY2hyb25pdXNseSBsb2FkcyBhIHRlbXBsYXRlXG4gICAgVmlldy5wcm90b3R5cGUubG9hZFRlbXBsYXRlQXN5bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBRLlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiBfdGhpcy5fdGVtcGxhdGVVcmwsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIGFzeW5jaHJvbml1c2x5IGNvbXBpbGUgYSB0ZW1wbGF0ZVxuICAgIFZpZXcucHJvdG90eXBlLmNvbXBpbGVUZW1wbGF0ZUFzeW5jID0gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gUS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBhc3luY2hyb25pdXNseSBsb2FkcyBhbmQgY29tcGlsZSBhIHRlbXBsYXRlIGlmIG5vdCBkb25lIGFscmVhZHlcbiAgICBWaWV3LnByb3RvdHlwZS5nZXRUZW1wbGF0ZUFzeW5jID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gUS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5fdGVtcGxhdGVEZWxlZ2F0ZSA9PT0gdW5kZWZpbmVkIHx8IF90aGlzLl90ZW1wbGF0ZURlbGVnYXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubG9hZFRlbXBsYXRlQXN5bmMoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5jb21waWxlVGVtcGxhdGVBc3luYyhzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh0ZW1wbGF0ZURlbGVnYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl90ZW1wbGF0ZURlbGVnYXRlID0gdGVtcGxhdGVEZWxlZ2F0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShfdGhpcy5fdGVtcGxhdGVEZWxlZ2F0ZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlKSB7IHJlamVjdChlKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKF90aGlzLl90ZW1wbGF0ZURlbGVnYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBhc3luY2hyb25pdXNseSByZW5kZXJzIHRoZSB2aWV3XG4gICAgVmlldy5wcm90b3R5cGUucmVuZGVyQXN5bmMgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIFEuUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBfdGhpcy5nZXRUZW1wbGF0ZUFzeW5jKClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodGVtcGxhdGVEZWxlZ2F0ZSkge1xuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIGh0bWwgYW5kIGFwcGVuZCB0byB0aGUgRE9NXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coX3RoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBodG1sID0gX3RoaXMuX3RlbXBsYXRlRGVsZWdhdGUobW9kZWwpO1xuICAgICAgICAgICAgICAgICQoX3RoaXMuX2NvbnRhaW5lcikuaHRtbChodG1sKTtcbiAgICAgICAgICAgICAgICAvLyBwYXNzIG1vZGVsIHRvIHJlc29sdmUgc28gaXQgY2FuIGJlIHVzZWQgYnlcbiAgICAgICAgICAgICAgICAvLyBzdWJ2aWV3cyBhbmQgRE9NIGV2ZW50IGluaXRpYWxpemVyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShtb2RlbCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZSkgeyByZWplY3QoZSk7IH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBWaWV3O1xufShldmVudF9lbWl0dGVyXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLlZpZXcgPSBWaWV3O1xuIl19
