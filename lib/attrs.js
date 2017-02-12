"use strict";
var typux_1 = require("typux");
var enums_1 = require("./enums");
var model_1 = require("./model");
//region Symbols
exports.HTTP_PARAM = Symbol('typux.http.param');
exports.HTTP_REQUEST = Symbol('typux.http.request');
exports.HTTP_RESPONSE = Symbol('typux.http.response');
//endregion
//region Request decorators
function Http(url, method) {
    if (method === void 0) { method = enums_1.HttpMethod.GET; }
    return function (target) {
        ensureRequestAttribute(target).setEndpoint(url, method);
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
//endregion
//region Response decorators
function HttpResponse(code) {
    return function (target) {
        ensureResponseAttribute(target).code = code;
    };
}
exports.HttpResponse = HttpResponse;
//endregion
//region Request params decorators
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
//endregion
/**
 * Returns http params for request message
 * @param {Object} message
 * @returns {[{name: (string|symbol), type: any}]}
 */
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
function isHttpRequest(message) {
    return typux_1.metadata.getClassInfo(message).hasAttribute(exports.HTTP_REQUEST);
}
exports.isHttpRequest = isHttpRequest;
/**
 * Returns `true` if message is http response
 *
 * @public
 * @param {Object} message
 * @returns {boolean}
 */
function isHttpResponse(message) {
    return typux_1.metadata.getClassInfo(message).hasAttribute(exports.HTTP_RESPONSE);
}
exports.isHttpResponse = isHttpResponse;
/**
 * Returns http options
 *
 * @public
 * @param {Function|Object} target
 * @returns {RequestAttribute}
 */
function getHttpOptions(target) {
    var info = typux_1.metadata.getClassInfo(target);
    if (false === info.hasAttribute(exports.HTTP_REQUEST)) {
        throw new Error("Class " + info.name + " doesn't have http options");
    }
    return info.getAttribute(exports.HTTP_REQUEST);
}
exports.getHttpOptions = getHttpOptions;
/**
 * Returns http options for message or create if not exists
 *
 * @private
 * @param {Function|Object} target
 * @returns {RequestAttribute}
 */
function ensureRequestAttribute(target) {
    var info = typux_1.metadata.getClassInfo(target);
    if (info.hasAttribute(exports.HTTP_REQUEST) === false) {
        info.setAttribute(exports.HTTP_REQUEST, new model_1.RequestAttribute());
    }
    return info.getAttribute(exports.HTTP_REQUEST);
}
/**
 * Returns http response attribute instance
 *
 * @param {Object} target
 * @returns {ResponseAttribute}
 */
function ensureResponseAttribute(target) {
    var info = typux_1.metadata.getClassInfo(target);
    if (info.hasAttribute(exports.HTTP_RESPONSE) === false) {
        info.setAttribute(exports.HTTP_RESPONSE, new model_1.ResponseAttribute());
    }
    return info.getAttribute(exports.HTTP_RESPONSE);
}
