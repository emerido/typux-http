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
    Object.defineProperty(HttpOptions.prototype, "methodName", {
        get: function () {
            return enums_1.HttpMethod[this.method].toUpperCase();
        },
        enumerable: true,
        configurable: true
    });
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
function HttpGet(url) {
    return Http(url, enums_1.HttpMethod.GET);
}
exports.HttpGet = HttpGet;
function HttpPut(url) {
    return Http(url, enums_1.HttpMethod.PUT);
}
exports.HttpPut = HttpPut;
function HttpPost(url) {
    return Http(url, enums_1.HttpMethod.POST);
}
exports.HttpPost = HttpPost;
function HttpDelete(url) {
    return Http(url, enums_1.HttpMethod.DELETE);
}
exports.HttpDelete = HttpDelete;
function HttpParam(place, name) {
    return function (target, property) {
        typux_1.metadata.definePropertyAttribute(target, property, exports.HTTP_PARAM, place);
    };
}
exports.HttpParam = HttpParam;
function HttpResponse(code) {
    return function (target) {
    };
}
exports.HttpResponse = HttpResponse;
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
    return typux_1.metadata.getClassInfo(message).hasAttribute(exports.HTTP);
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
    var info = typux_1.metadata.getClassInfo(target);
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
    var info = typux_1.metadata.getClassInfo(target);
    if (info.hasAttribute(exports.HTTP) === false) {
        info.setAttribute(exports.HTTP, new HttpOptions());
    }
    return info.getAttribute(exports.HTTP);
}
exports.ensureHttpOptions = ensureHttpOptions;
