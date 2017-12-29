/// <reference path="../../framework/inferfaces" />

import { View, AppEvent, ViewSettings, Route } from "../../framework/framework";

@ViewSettings("./source/app/templates/market.hbs", "#outlet")
class MarketView extends View implements IView {
  constructor(mediator : IMediator) {
    super(mediator);
  }

  public initialize() : void {
    this.subscribeToEvents([
      new AppEvent("app.view.market.render", null, (e, args : any) => {
        this.renderAsync(args)
            .then((model) => {
              // set DOM events
              this.bindDomEvents(model);
            })
            .catch((e) => {
              // pass control to the global error handler
              this.triggerEvent(new AppEvent("app.error", e, null));
            });
      }),
    ])
  }

  public dispose() : void {
    this.unbindDomEvents();
    this.unsubscribeToEvents();  
  }

  // initialize DOM events
  protected bindDomEvents(model : any) {
    var scope = $(this._container);
    
    // handle click on "quote" button
    $(".getQuote").on("click", scope, (e) => {
      var symbol = $(e.currentTarget).data('symbol');
      this.getStockQuote(symbol);
    });

    // make table sortable and searchable
    $(scope).find("table").DataTable();
  }

  // disposes DOM events
  protected unbindDomEvents() {
    var scope = this._container;
    $(".getQuote").off("click", scope);
    var table = $(scope).find("table").DataTable();
    table.destroy();
  }

  private getStockQuote(symbol : string) {
    // navigate to route using route event
    this.triggerEvent(new AppEvent("app.route", new Route("symbol", "quote", [symbol]), null));
  }
}

export { MarketView }