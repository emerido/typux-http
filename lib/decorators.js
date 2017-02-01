"use strict";
var typux_1 = require("typux");
var HTTP = Symbol('typux.http');
var HttpMethod;
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["POST"] = 1] = "POST";
    HttpMethod[HttpMethod["PUT"] = 2] = "PUT";
    HttpMethod[HttpMethod["DELETE"] = 3] = "DELETE";
    HttpMethod[HttpMethod["OPTIONS"] = 4] = "OPTIONS";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var HttpOptions = (function () {
    function HttpOptions() {
    }
    HttpOptions.prototype.setEndpoint = function (url, method) {
        this.url = url;
        this.method = method;
    };
    return HttpOptions;
}());
exports.HttpOptions = HttpOptions;
function Http(url, method) {
    if (method === void 0) { method = HttpMethod.GET; }
    return function (target) {
        ensureHttpOptions(target).setEndpoint(url, method);
    };
}
exports.Http = Http;
function hasHttpOptions(message) {
    return typux_1.metadata.getClassInfo(message.constructor).hasAttribute(HTTP);
}
exports.hasHttpOptions = hasHttpOptions;
function getHttpOptions(target) {
    var info = typux_1.metadata.getClassInfo(typeof target === 'function' ? target : target.constructor);
    if (info.hasAttribute(HTTP)) {
        throw new Error("Class " + info.name + " doesn't have http options");
    }
    return info.getAttribute(HTTP);
}
exports.getHttpOptions = getHttpOptions;
function ensureHttpOptions(target) {
    var info = typux_1.metadata.getClassInfo(typeof target === 'function' ? target : target.constructor);
    if (info.hasAttribute(HTTP) === false) {
        info.setAttribute(HTTP, new HttpOptions());
    }
    return info.getAttribute(HTTP);
}
