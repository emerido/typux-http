"use strict";
var typux_1 = require("typux");
var enums_1 = require("./enums");
var model_1 = require("./model");
exports.HttpRequest = function (url, method) {
    return typux_1.Attribute(new model_1.HttpRequestAttribute(url, method));
};
exports.HttpGet = function (url) { return exports.HttpRequest(url, enums_1.HttpMethod.GET); };
exports.HttpPut = function (url) { return exports.HttpRequest(url, enums_1.HttpMethod.PUT); };
exports.HttpPost = function (url) { return exports.HttpRequest(url, enums_1.HttpMethod.POST); };
exports.HttpDelete = function (url) { return exports.HttpRequest(url, enums_1.HttpMethod.DELETE); };
exports.HttpReceive = function () {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    return typux_1.Attribute(new model_1.HttpReceiveAttribute(messages));
};
exports.HttpResponse = function (code) {
    return typux_1.Attribute(new model_1.HttpResponseAttribute(code));
};
exports.HttpParameter = function (type, alias) {
    return typux_1.Attribute(new model_1.HttpParameterAttribute(type, alias));
};
exports.Path = function (alias) { return exports.HttpParameter(enums_1.HttpParameterType.Path); };
exports.Body = function (alias) { return exports.HttpParameter(enums_1.HttpParameterType.Body); };
exports.Query = function (alias) { return exports.HttpParameter(enums_1.HttpParameterType.Query); };
exports.Ignore = function (alias) { return exports.HttpParameter(enums_1.HttpParameterType.Ignore); };
