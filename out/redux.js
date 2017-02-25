"use strict";
var typux_1 = require("typux");
var utils_1 = require("./utils");
var model_1 = require("./model");
var manager_1 = require("./manager");
function reduxHttpMiddleware() {
    var manager = new manager_1.Manager();
    return function (store) { return function (next) { return function (action) {
        if (action.data && utils_1.isHttpRequest(action.data)) {
            var requestAttributes = typux_1.reflect.getClassInfo(action.data)
                .getAttributes(model_1.HttpRequestAttribute);
            var requestModel = requestAttributes
                .reduce(function (r, a) { return a.onRequest(r, action.data); }, new model_1.Request());
            manager.execute(requestModel)
                .then(console.log);
            console.log(requestModel);
        }
        next(action);
    }; }; };
}
exports.reduxHttpMiddleware = reduxHttpMiddleware;
