/// <reference path="../framework/interfaces.ts"/>

import { App, View } from "../framework/framework";

import { MarketController } from "./controllers/market_controller";
import { SymbolController } from "./controllers/symbol_controller";
import { Promise } from "q";

var appSettings : IAppSettings = {
  isDebug: true,
  defaultController: "market",
  defaultAction: "nasdaq",
  controllers: [
    {
      controllerName: "market",
      controller: MarketController
    },
    {
      controllerName: "symbol",
      controller: SymbolController
    }
  ],
  onErrorHandler: function(e : Object) {
    alert("Sorry! there has been an error please checkout the console for more info!");
    console.log(e.toString());
  }
};

var myApp = new App(appSettings);
myApp.initialize();