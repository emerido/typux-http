"use strict";
var attrs_1 = require("./attrs");
var enums_1 = require("./enums");
var utils_1 = require("./utils");
var RequestModel = (function () {
    function RequestModel(message) {
        this._query = {};
        this._body = {};
        this.message = message;
        this.options = attrs_1.getHttpOptions(message);
        this.payload = attrs_1.getHttpProps(message);
        this.preparePayload();
    }
    RequestModel.prototype.preparePayload = function () {
        var _this = this;
        Object.keys(this.message)
            .map(function (key) { return _this.payload.find(function (x) { return x.name == key; }); })
            .filter(function (prop) { return prop !== null; })
            .forEach(function (prop) {
            switch (prop.type) {
                case enums_1.HttpOptionPlace.Body:
                    _this._body[prop.name] = _this.message[prop.name];
                    break;
                case enums_1.HttpOptionPlace.Query:
                    _this._query[prop.name] = _this.message[prop.name];
                    break;
            }
        });
    };
    Object.defineProperty(RequestModel.prototype, "queryString", {
        get: function () {
            return utils_1.formatQuery(this._query);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestModel.prototype, "query", {
        get: function () {
            return this._query;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestModel.prototype, "method", {
        get: function () {
            return this.options.methodName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestModel.prototype, "body", {
        get: function () {
            return this._body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestModel.prototype, "url", {
        get: function () {
            return utils_1.formatUrl(this.options.url, this.message);
        },
        enumerable: true,
        configurable: true
    });
    return RequestModel;
}());
exports.RequestModel = RequestModel;
var RequestAttribute = (function () {
    function RequestAttribute() {
    }
    RequestAttribute.prototype.hasBody = function () {
        return this.method
            && this.method === enums_1.HttpMethod.POST
            || this.method === enums_1.HttpMethod.PUT;
    };
    RequestAttribute.prototype.setEndpoint = function (url, method) {
        this.url = url;
        this.method = method;
    };
    Object.defineProperty(RequestAttribute.prototype, "methodName", {
        get: function () {
            return enums_1.HttpMethod[this.method].toUpperCase();
        },
        enumerable: true,
        configurable: true
    });
    return RequestAttribute;
}());
exports.RequestAttribute = RequestAttribute;
var ResponseAttribute = (function () {
    function ResponseAttribute() {
    }
    return ResponseAttribute;
}());
exports.ResponseAttribute = ResponseAttribute;
