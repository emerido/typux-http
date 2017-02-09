"use strict";
require("whatwg-fetch");
var attrs_1 = require("./attrs");
var model_1 = require("./model");
function reduxHttpMiddleware(options) {
    return function (store) { return function (next) { return function (action) {
        if (action.data && attrs_1.hasHttpOptions(action.data)) {
            var builder = new model_1.RequestModel(action.data);
            var url = builder.url;
            var body = builder.body;
            var query = builder.queryString;
            if (query && query.length) {
                url += url.indexOf('?') == -1
                    ? '?' + query
                    : '&' + query;
            }
            var payload_1 = builder.options.hasBody() ? new FormData() : null;
            if (payload_1 && body.length) {
                body.forEach(function (pair) {
                    payload_1.append(pair[0], pair[1]);
                });
            }
            var request = new Request(url, {
                method: builder.method,
                body: payload_1
            });
            // TODO
            var promise = fetch(request)
                .catch(function (x) { return console.log('Http Error', x); });
        }
        next(action);
    }; }; };
}
exports.reduxHttpMiddleware = reduxHttpMiddleware;
