/// <reference path="../../framework/interfaces" />

import { Controller, AppEvent } from "../../framework/framework";

import { MarketView } from "../views/market_view";
import { NasdaqModel } from "../models/nasdaq_model";
import { NyseModel } from "../models/nyse_model";

class MarketController extends Controller implements IController {
  private _marketView : IView;
  private _nasdaqModel : IModel;
  private _nyseModel : IModel;

  constructor(mediator : IMediator) {
    super(mediator);
    this._marketView  = new MarketView(mediator);
    this._nasdaqModel = new NasdaqModel(mediator);
    this._nyseModel   = new NyseModel(mediator);
  }

  public initialize() : void {
    // subscribe to controller action events
    this.subscribeToEvents([
      new AppEvent("app.controller.market.nasdaq", null, (e, args : string[]) => {
        this.nasdaq(args);
      }),
      new AppEvent("app.controller.market.nyse", null, (e, args : string[]) => {
        this.nyse(args);
      })
    ]);

    // initialize view and models events
    this._marketView.initialize();
    this._nasdaqModel.initialize();
    this._nyseModel.initialize();
  }

  // dispose view/models and stop listening to controller actions
  public dispose() : void {
    // dipose the controller events
    this.unsubscribeToEvents();

    // dipose views and model events
    this._marketView.dispose();
    this._nasdaqModel.dispose();
    this._nyseModel.dispose();
  }

  // display NASDAQ stocks
  public nasdaq(args : string[]) {
    this._mediator.publish(new AppEvent("app.model.nasdaq.change", null, null));
  }

  // display NYSE stocks
  public nyse(args : string[]) {
    this._mediator.publish(new AppEvent("app.model.nyse.change", null, null));
  }

  

}

export { MarketController };