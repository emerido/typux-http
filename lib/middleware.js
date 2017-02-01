"use strict";
require("whatwg-fetch");
var decorators_1 = require("./decorators");
function typuxHttpMiddleware(options) {
    return function (store) { return function (next) { return function (action) {
        if (action.data && decorators_1.hasHttpOptions(action.data)) {
            // TODO : Add requests
            console.log(action);
        }
        next(action);
    }; }; };
}
exports.typuxHttpMiddleware = typuxHttpMiddleware;
