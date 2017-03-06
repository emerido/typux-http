"use strict";
var messages_1 = require("./test/messages");
var manager_1 = require("./manager");
var executor = new manager_1.Manager();
executor.execute(new messages_1.FetchPost(1000000))
    .then(console.log);
