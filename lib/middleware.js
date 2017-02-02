"use strict";
require("whatwg-fetch");
var helpers_1 = require("./helpers");
var decorators_1 = require("./decorators");
function typuxHttpMiddleware(options) {
    return function (store) { return function (next) { return function (action) {
        if (action.data && decorators_1.hasHttpOptions(action.data)) {
            var params = decorators_1.getHttpProps(action.data);
            var options_1 = decorators_1.getHttpOptions(action.data);
            var body = options_1.hasBody()
                ? helpers_1.composeBody(action.data, params)
                : null;
            var url = helpers_1.formatUrl(options_1.url, action.data);
            var query = helpers_1.composeQuery(action.data, params);
            if (query && query.length) {
                url += url.indexOf('?') == -1
                    ? '?' + query
                    : '&' + query;
            }
            var payload_1 = options_1.hasBody() ? new FormData() : null;
            if (payload_1 && body.length) {
                body.forEach(function (pair) {
                    payload_1.append(pair[0], pair[1]);
                });
            }
            var request = new Request(url, {
                method: decorators_1.HttpMethod[options_1.method].toUpperCase(),
                body: payload_1
            });
            // TODO
            var promise = fetch(request)
                .catch(function (x) { return console.log('Http Error', x); });
        }
        next(action);
    }; }; };
}
exports.typuxHttpMiddleware = typuxHttpMiddleware;
