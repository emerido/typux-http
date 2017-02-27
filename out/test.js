"use strict";
var redux_1 = require("./redux");
var messages_1 = require("./test/messages");
var state = {
    dispatch: function (action) {
        console.log('Dispatched new action', action);
    }
};
var action = function (data) { return ({ data: data }); };
var middleware = redux_1.reduxHttpMiddleware()(state)(function (x) { return x; });
middleware(action(new messages_1.FetchPost(12)));
