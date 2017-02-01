"use strict";
require("whatwg-fetch");
var decorators_1 = require("./decorators");
function typuxHttpMiddleware(options) {
    return function (store) { return function (next) { return function (action) {
        if (action.data && decorators_1.hasHttpOptions(action.data)) {
            var options_1 = decorators_1.getHttpOptions(action.data);
            var endpoint = templateUrl(options_1.url, action.data);
            var payload_1 = options_1.method === decorators_1.HttpMethod.POST || options_1.method === decorators_1.HttpMethod.PUT
                ? new FormData()
                : null;
            Object.keys(action.data).forEach(function (key) {
                // TODO : Check property options
                payload_1 && payload_1.append(key, action.data[key]);
            });
            var request = new Request(endpoint, {
                method: decorators_1.HttpMethod[options_1.method].toUpperCase(),
                body: payload_1
            });
            var promise = fetch(request)
                .catch(function (x) { return console.log('Http Error', x); });
        }
        next(action);
    }; }; };
}
exports.typuxHttpMiddleware = typuxHttpMiddleware;
function templateUrl(url, data) {
    return url.replace(/\{(.+?)\}/g, function (_, match) {
        if (data.hasOwnProperty(match)) {
            return data[match];
        }
        return _;
    });
}
