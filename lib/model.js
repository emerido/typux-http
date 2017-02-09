"use strict";
var attrs_1 = require("./attrs");
var enums_1 = require("./enums");
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
            return formatQuery(this._query);
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
            return formatUrl(this.options.url, this.message);
        },
        enumerable: true,
        configurable: true
    });
    return RequestModel;
}());
exports.RequestModel = RequestModel;
/**
 * Formats template url
 *
 * @param {string} url
 * @param {object} data
 *
 * @returns {string}
 */
function formatUrl(url, data) {
    return url.replace(/\{(.+?)\}/g, function (_, match) {
        if (data.hasOwnProperty(match)) {
            return data[match];
        }
        return _;
    });
}
exports.formatUrl = formatUrl;
/**
 * Formats query object
 *
 * @param {object} data
 * @param {string?} prefix
 *
 * @returns {string}
 */
function formatQuery(data, prefix) {
    var parts = [], prop;
    for (prop in data) {
        if (data.hasOwnProperty(prop) === false) {
            continue;
        }
        var key = prefix ? prefix + "[" + prop + "]" : prop, value = data[prop];
        parts.push((value !== null && typeof value === "object") ?
            formatQuery(value, key) :
            encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
    return parts.join("&");
}
exports.formatQuery = formatQuery;
