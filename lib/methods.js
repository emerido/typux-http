"use strict";
var decorators_1 = require("./decorators");
var typux_1 = require("typux");
function getHttpProps(message) {
    return typux_1.metadata.getClassInfo(message).getProperties()
        .filter(function (x) { return x.hasAttribute(decorators_1.HTTP_PARAM); })
        .map(function (x) { return ({
        name: x.name,
        type: x.getAttribute(decorators_1.HTTP_PARAM)
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
    return typux_1.metadata.getClassInfo(message.constructor).hasAttribute(decorators_1.HTTP);
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
    if (false === info.hasAttribute(decorators_1.HTTP)) {
        throw new Error("Class " + info.name + " doesn't have http options");
    }
    return info.getAttribute(decorators_1.HTTP);
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
    if (info.hasAttribute(decorators_1.HTTP) === false) {
        info.setAttribute(decorators_1.HTTP, new decorators_1.HttpOptions());
    }
    return info.getAttribute(decorators_1.HTTP);
}
exports.ensureHttpOptions = ensureHttpOptions;
