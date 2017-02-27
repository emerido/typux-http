"use strict";
require("isomorphic-fetch");
var utils_1 = require("./utils");
var model_1 = require("./model");
var Manager = (function () {
    function Manager(config) {
        this.config = config || {};
    }
    Object.defineProperty(Manager.prototype, "urlBuilder", {
        get: function () {
            return this.config.urlBuilder || (this.config.urlBuilder = new UrlBuilder());
        },
        enumerable: true,
        configurable: true
    });
    Manager.prototype.execute = function (model) {
        // TODO : Add typux-model peer dependency
        // TODO : Add url params transform
        // TODO : Add response action dispatch
        var url = this.urlBuilder.build(model);
        var request = new Request(url, {
            method: model.method,
        });
        var response = new model_1.Response();
        return fetch(request)
            .then(function (x) {
            response.status = x.status;
            // Copy headers
            x.headers.forEach(function (key, status) {
                return response.headers[status] = x.headers.get(key);
            });
            return x.text();
        })
            .then(function (x) {
            response.data = x;
            return response;
        })
            .catch(function (x) {
            // TODO : Separate local error handling
            response.status = x.status || 500;
            response.data = x;
            throw response;
        });
    };
    return Manager;
}());
exports.Manager = Manager;
var UrlBuilder = (function () {
    function UrlBuilder() {
    }
    UrlBuilder.prototype.build = function (request) {
        var query = utils_1.formatQuery(request.query);
        var path = utils_1.formatUrl(request.url, request.params);
        return path + (path.indexOf('?') > -1 ? '&' : '?') + query;
    };
    return UrlBuilder;
}());
exports.UrlBuilder = UrlBuilder;
