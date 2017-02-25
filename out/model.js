"use strict";
var enums_1 = require("./enums");
var typux_1 = require("typux");
var Request = (function () {
    function Request() {
        this.body = {};
        this.query = {};
        this.params = {};
        this.headers = {};
    }
    return Request;
}());
exports.Request = Request;
var Response = (function () {
    function Response() {
        this.headers = {};
    }
    return Response;
}());
exports.Response = Response;
var HttpRequestAttribute = (function () {
    function HttpRequestAttribute(endpoint, method) {
        this.params = {};
        this.query = {};
        this.body = {};
        this.pattern = endpoint;
        this.method = method;
    }
    HttpRequestAttribute.prototype.onRequest = function (request, message) {
        request.url = this.pattern;
        request.method = enums_1.HttpMethod[this.method].toUpperCase();
        var parameters = typux_1.reflect.getClassInfo(message).getProperties()
            .filter(function (x) { return x.hasAttribute(HttpParameterAttribute); });
        parameters
            .filter(function (x) { return x.getAttribute(HttpParameterAttribute).type == enums_1.HttpParameterType.Path; })
            .forEach(function (x) {
            request.params[x.name] = message[x.name];
        });
        parameters
            .filter(function (x) { return x.getAttribute(HttpParameterAttribute).type == enums_1.HttpParameterType.Query; })
            .forEach(function (x) {
            request.query[x.name] = message[x.name];
        });
        return request;
    };
    return HttpRequestAttribute;
}());
exports.HttpRequestAttribute = HttpRequestAttribute;
var HttpResponseAttribute = (function () {
    function HttpResponseAttribute(code) {
        this.code = code;
    }
    return HttpResponseAttribute;
}());
exports.HttpResponseAttribute = HttpResponseAttribute;
var HttpParameterAttribute = (function () {
    function HttpParameterAttribute(type, alias) {
        this.type = type;
        this.alias = alias;
    }
    return HttpParameterAttribute;
}());
exports.HttpParameterAttribute = HttpParameterAttribute;
