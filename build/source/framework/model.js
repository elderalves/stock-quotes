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
