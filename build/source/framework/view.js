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
