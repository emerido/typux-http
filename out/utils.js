"use strict";
var typux_1 = require("typux");
var model_1 = require("./model");
function isHttpRequest(data) {
    return typux_1.reflect.getClassInfo(data).hasAttribute(model_1.HttpRequestAttribute);
}
exports.isHttpRequest = isHttpRequest;
function formatUrl(url, data) {
    var path = formatPath(url, data);
    var query = formatQuery(data);
    if (query.length > 0) {
        path += (path.indexOf('?') > -1 ? '&' : '?') + query;
    }
    return path;
}
exports.formatUrl = formatUrl;
/**
 * Formats template pattern
 *
 * @param {string} url
 * @param {object} data
 *
 * @returns {string}
 */
function formatPath(url, data) {
    return url.replace(/\{(.+?)\}/g, function (_, match) {
        if (data.hasOwnProperty(match)) {
            return data[match];
        }
        return _;
    });
}
exports.formatPath = formatPath;
/**
 * Formats query object
 *
 * @param {object} data
 * @param {string?} prefix
 *
 * @returns {string}
 */
function formatQuery(data, prefix) {
    var parts = [], prop;
    for (prop in data) {
        if (data.hasOwnProperty(prop) === false) {
            continue;
        }
        var key = prefix ? prefix + "[" + prop + "]" : prop, value = data[prop];
        parts.push((value !== null && typeof value === "object") ?
            formatQuery(value, key) :
            encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
    return parts.join("&");
}
exports.formatQuery = formatQuery;
