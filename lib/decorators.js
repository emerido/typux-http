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
function Http(url, method) {
    if (method === void 0) { method = HttpMethod.GET; }
    return function (target) {
        typux_1.metadata.defineClassAttribute(target, HTTP, url);
    };
}
exports.Http = Http;
