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
