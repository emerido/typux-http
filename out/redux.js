"use strict";
require("whatwg-fetch");
var utils_1 = require("./utils");
var model_1 = require("./model");
var typux_1 = require("typux");
function reduxHttpMiddleware() {
    return function (store) { return function (next) { return function (action) {
        if (action.data && utils_1.isHttpRequest(action.data)) {
            var requestAttributes = typux_1.reflect.getClassInfo(action.data)
                .getAttributes(model_1.HttpRequestAttribute);
            var requestModel = requestAttributes
                .reduce(function (r, a) { return a.compose(r, action.data); }, new model_1.Request());
            console.log(requestModel);
        }
        next(action);
    }; }; };
}
exports.reduxHttpMiddleware = reduxHttpMiddleware;
