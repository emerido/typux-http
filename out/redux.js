"use strict";
var typux_1 = require("typux");
var utils_1 = require("./utils");
var model_1 = require("./model");
var manager_1 = require("./manager");
function reduxHttpMiddleware() {
    var manager = new manager_1.Manager();
    return function (store) { return function (next) { return function (action) {
        if (action.data && utils_1.isHttpRequest(action.data)) {
            var info = typux_1.reflect.getClassInfo(action.data);
            // Get request attributes
            var requestAttributes = info
                .getAttributes(model_1.HttpRequestAttribute);
            // Build request model
            var requestModel = requestAttributes
                .reduce(function (r, a) { return a.onRequest(r, action.data); }, new model_1.Request());
            var receive = info.hasAttribute(model_1.HttpReceiveAttribute)
                ? info.getAttribute(model_1.HttpReceiveAttribute)
                : null;
            var responses_1 = {};
            if (receive) {
                responses_1 = receive.messages
                    .map(function (m) { return typux_1.reflect.getClassInfo(m); })
                    .filter(function (i) { return i.hasAttribute(model_1.HttpResponseAttribute); })
                    .reduce(function (map, info) {
                    var attr = info.getAttribute(model_1.HttpResponseAttribute);
                    map[attr.code] = info.type;
                    return map;
                }, {});
            }
            manager.execute(requestModel)
                .then(function (x) {
                if (false === responses_1.hasOwnProperty(x.status)) {
                    return x;
                }
                var message = responses_1[x.status];
                // Simple binder :)
                store.dispatch(Object.assign(new message(), JSON.parse(x.data)));
            })
                .catch(function (x) {
            });
        }
        next(action);
    }; }; };
}
exports.reduxHttpMiddleware = reduxHttpMiddleware;
