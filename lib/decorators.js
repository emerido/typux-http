"use strict";
var typux_1 = require("typux");
var HTTP = Symbol('typux.http');
var HTTP_PARAM = Symbol('typux.http.param');
var HttpMethod;
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["PUT"] = 1] = "PUT";
    HttpMethod[HttpMethod["HEAD"] = 2] = "HEAD";
    HttpMethod[HttpMethod["POST"] = 3] = "POST";
    HttpMethod[HttpMethod["PATCH"] = 4] = "PATCH";
    HttpMethod[HttpMethod["DELETE"] = 5] = "DELETE";
    HttpMethod[HttpMethod["OPTIONS"] = 6] = "OPTIONS";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var HttpOptionPlace;
(function (HttpOptionPlace) {
    HttpOptionPlace[HttpOptionPlace["Ignore"] = 0] = "Ignore";
    HttpOptionPlace[HttpOptionPlace["Query"] = 1] = "Query";
    HttpOptionPlace[HttpOptionPlace["Body"] = 2] = "Body";
})(HttpOptionPlace = exports.HttpOptionPlace || (exports.HttpOptionPlace = {}));
var HttpOptions = (function () {
    function HttpOptions() {
    }
    HttpOptions.prototype.hasBody = function () {
        return this.method
            && this.method === HttpMethod.POST
            || this.method === HttpMethod.PUT;
    };
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
function Get(url) {
    return Http(url, HttpMethod.GET);
}
exports.Get = Get;
function Put(url) {
    return Http(url, HttpMethod.PUT);
}
exports.Put = Put;
function Post(url) {
    return Http(url, HttpMethod.POST);
}
exports.Post = Post;
function Delete(url) {
    return Http(url, HttpMethod.DELETE);
}
exports.Delete = Delete;
function HttpParam(place, name) {
    return function (target, property) {
        typux_1.metadata.definePropertyAttribute(target, property, HTTP_PARAM, place);
    };
}
exports.HttpParam = HttpParam;
function getHttpProps(message) {
    return typux_1.metadata.getClassInfo(message.constructor).getProperties()
        .filter(function (x) { return x.hasAttribute(HTTP_PARAM); })
        .map(function (x) { return ({
        name: x.name,
        type: x.getAttribute(HTTP_PARAM)
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
    return typux_1.metadata.getClassInfo(message.constructor).hasAttribute(HTTP);
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
    if (false === info.hasAttribute(HTTP)) {
        throw new Error("Class " + info.name + " doesn't have http options");
    }
    return info.getAttribute(HTTP);
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
    if (info.hasAttribute(HTTP) === false) {
        info.setAttribute(HTTP, new HttpOptions());
    }
    return info.getAttribute(HTTP);
}
