"use strict";
var decorators_1 = require("./decorators");
function formatUrl(url, data) {
    return url.replace(/\{(.+?)\}/g, function (_, match) {
        if (data.hasOwnProperty(match)) {
            return data[match];
        }
        return _;
    });
}
exports.formatUrl = formatUrl;
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
function composeBody(data, props) {
    return Object.keys(data)
        .map(function (key) {
        var prop = props.find(function (x) { return x.name == key; });
        if (prop == null || prop.type === decorators_1.HttpOptionPlace.Body) {
            return [key, data[key]];
        }
    })
        .filter(function (x) { return x != null; });
}
exports.composeBody = composeBody;
function composeQuery(data, props) {
    var result = {};
    Object.keys(data).map(function (key) {
        var prop = props.find(function (x) { return x.name == key; });
        if (prop == null || prop.type === decorators_1.HttpOptionPlace.Query) {
            result[key] = data[key];
        }
    });
    return formatQuery(result);
}
exports.composeQuery = composeQuery;
