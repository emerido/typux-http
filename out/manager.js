"use strict";
require("isomorphic-fetch");
var typux_1 = require("typux");
var model_1 = require("./model");
var model_2 = require("./model");
var Manager = (function () {
    function Manager(config) {
        this.config = config || {};
    }
    Object.defineProperty(Manager.prototype, "requestBuilder", {
        get: function () {
            return new RequestBuilder();
        },
        enumerable: true,
        configurable: true
    });
    Manager.prototype.execute = function (message) {
        var info = typux_1.reflect.getClassInfo(message);
        var request = this.requestBuilder.build(message);
        var receive = info.getAttributes(model_2.HttpReceiveAttribute)
            .reduce(function (all, attr) { return all.concat(attr.messages); }, [])
            .map(function (x) { return typux_1.reflect.getClassInfo(x); })
            .map(function (x) { return [x.getAttribute(model_1.HttpResponseAttribute), x.type]; });
        var response = new model_1.Response();
        function process(response) {
            var best = receive.find(function (x) { return x[0].code == response.status; });
            if (best) {
                // TODO : User typux-model for mapping
                return Object.assign(new best[1](), response.body.json());
            }
        }
        return fetch(request.url.toString(), {
            headers: request.headers,
            method: request.methodName,
            body: request.body,
        })
            .then(function (x) {
            console.log(x.url);
            response.status = x.status;
            response.headers = x.headers;
            return x;
        })
            .then(function (x) { return x.text(); })
            .then(function (x) { return response.body = new model_1.Body(x); })
            .then(function (x) { return response; })
            .then(process);
    };
    return Manager;
}());
exports.Manager = Manager;
var RequestBuilder = (function () {
    function RequestBuilder() {
    }
    RequestBuilder.prototype.build = function (message) {
        var info = typux_1.reflect.getClassInfo(message);
        // Get request attributes
        var requestAttributes = info
            .getAttributes(model_2.HttpRequestAttribute);
        if (requestAttributes.length === 0) {
            throw new Error('Can\'t execute non request message');
        }
        var request = requestAttributes
            .reduce(function (request, attr) { return attr.onRequest(request, message); }, new model_1.Request());
        info.getProperties()
            .filter(function (x) { return x.hasAttribute(model_2.HttpParameterAttribute); })
            .forEach(function (x) {
            x.getAttributes(model_2.HttpParameterAttribute)
                .forEach(function (a) { return a.onRequest(x.name, request, message); });
        });
        return request;
    };
    return RequestBuilder;
}());
exports.RequestBuilder = RequestBuilder;
