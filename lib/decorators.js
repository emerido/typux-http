"use strict";
var typux_1 = require("typux");
var enums_1 = require("./enums");
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
        ensureHttpOptions(target).setEndpoint(url, method);
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
function getHttpProps(message) {
    return typux_1.metadata.getClassInfo(message).getProperties()
        .filter(function (x) { return x.hasAttribute(exports.HTTP_PARAM); })
        .map(function (x) { return ({
        name: x.name,
        type: x.getAttribute(exports.HTTP_PARAM)
    }); });
}
exports.getHttpProps = getHttpProps;
/**
 * Returns `true` if http options exists in message instance
 *
 * @public
 * @param {Object} message Instance of message
 * @returns {boolean}
 */
function hasHttpOptions(message) {
    return typux_1.metadata.getClassInfo(message.constructor).hasAttribute(exports.HTTP);
}
exports.hasHttpOptions = hasHttpOptions;
/**
 * Returns http options
 *
 * @public
 * @param {Function|Object} target
 * @returns {HttpOptions}
 */
function getHttpOptions(target) {
    var info = typux_1.metadata.getClassInfo(typeof target === 'function' ? target : target.constructor);
    if (false === info.hasAttribute(exports.HTTP)) {
        throw new Error("Class " + info.name + " doesn't have http options");
    }
    return info.getAttribute(exports.HTTP);
}
exports.getHttpOptions = getHttpOptions;
/**
 * Returns http options for message or create if not exists
 *
 * @private
 * @param {Function|Object} target
 * @returns {HttpOptions}
 */
function ensureHttpOptions(target) {
    var info = typux_1.metadata.getClassInfo(typeof target === 'function' ? target : target.constructor);
    if (info.hasAttribute(exports.HTTP) === false) {
        info.setAttribute(exports.HTTP, new HttpOptions());
    }
    return info.getAttribute(exports.HTTP);
}
