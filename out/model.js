"use strict";
var enums_1 = require("./enums");
var typux_1 = require("typux");
var utils_1 = require("./utils");
var Request = (function () {
    function Request() {
        this.body = {};
        this.query = {};
        this.headers = {};
    }
    return Request;
}());
exports.Request = Request;
var Response = (function () {
    function Response() {
    }
    return Response;
}());
exports.Response = Response;
var HttpRequestAttribute = (function () {
    function HttpRequestAttribute(url, method) {
        this.url = url;
        this.method = method;
    }
    HttpRequestAttribute.prototype.compose = function (request, data) {
        var parameters = typux_1.reflect.getClassInfo(data).getProperties()
            .filter(function (x) { return x.hasAttribute(HttpParameterAttribute); });
        var routeParams = parameters
            .filter(function (x) { return x.getAttribute(HttpParameterAttribute).type == enums_1.HttpParameterType.Path; })
            .reduce(function (dict, param) {
            // TODO : Added getter for param name
            dict[param.name] = data[param.name];
            return dict;
        }, {});
        var queryParams = parameters
            .filter(function (x) { return x.getAttribute(HttpParameterAttribute).type == enums_1.HttpParameterType.Query; })
            .forEach(function (x) {
            request.query[x.name] = data[x.name];
        });
        request.url = utils_1.formatUrl(this.url, routeParams);
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
