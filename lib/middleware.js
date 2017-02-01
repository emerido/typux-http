"use strict";
require("whatwg-fetch");
var decorators_1 = require("./decorators");
function typuxHttpMiddleware(options) {
    return function (store) { return function (next) { return function (action) {
        if (action.data && decorators_1.hasHttpOptions(action.data)) {
            var options_1 = decorators_1.getHttpOptions(action.data);
            var promise = fetch(options_1.url, {
                method: decorators_1.HttpMethod[options_1.method].toUpperCase()
            });
            promise.catch(function (x) { return console.log('Http Error', x); });
        }
        next(action);
    }; }; };
}
exports.typuxHttpMiddleware = typuxHttpMiddleware;
