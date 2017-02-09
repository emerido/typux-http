"use strict";
var typux_1 = require("typux");
var enums_1 = require("./enums");
var methods_1 = require("./methods");
exports.HTTP = Symbol('typux.http');
exports.HTTP_PARAM = Symbol('typux.http.param');
var HttpOptions = (function () {
    function HttpOptions() {
    }
    HttpOptions.prototype.hasBody = function () {
        return this.method
            && this.method === enums_1.HttpMethod.POST
            || this.method === enums_1.HttpMethod.PUT;
    };
    HttpOptions.prototype.setEndpoint = function (url, method) {
        this.url = url;
        this.method = method;
    };
    return HttpOptions;
}());
exports.HttpOptions = HttpOptions;
function Http(url, method) {
    if (method === void 0) { method = enums_1.HttpMethod.GET; }
    return function (target) {
        methods_1.ensureHttpOptions(target).setEndpoint(url, method);
    };
}
exports.Http = Http;
function Get(url) {
    return Http(url, enums_1.HttpMethod.GET);
}
exports.Get = Get;
function Put(url) {
    return Http(url, enums_1.HttpMethod.PUT);
}
exports.Put = Put;
function Post(url) {
    return Http(url, enums_1.HttpMethod.POST);
}
exports.Post = Post;
function Delete(url) {
    return Http(url, enums_1.HttpMethod.DELETE);
}
exports.Delete = Delete;
function HttpParam(place, name) {
    return function (target, property) {
        typux_1.metadata.definePropertyAttribute(target, property, exports.HTTP_PARAM, place);
    };
}
exports.HttpParam = HttpParam;
function Ignore() {
    return HttpParam(enums_1.HttpOptionPlace.Ignore);
}
exports.Ignore = Ignore;
function Body() {
    return HttpParam(enums_1.HttpOptionPlace.Body);
}
exports.Body = Body;
function Query() {
    return HttpParam(enums_1.HttpOptionPlace.Query);
}
exports.Query = Query;
