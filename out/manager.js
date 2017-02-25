"use strict";
require("isomorphic-fetch");
var model_1 = require("./model");
var Manager = (function () {
    function Manager(config) {
        this.config = config;
    }
    Manager.prototype.execute = function (model) {
        var request = new Request(model.url, {
            method: model.method,
        });
        var response = new model_1.Response();
        return fetch(request)
            .then(function (x) {
            response.status = x.status;
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
            response.status = x.status || 500;
            response.data = x.text || x.message;
            return response;
        });
    };
    return Manager;
}());
exports.Manager = Manager;
