"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var redux_1 = require("./redux");
var attrs_1 = require("./attrs");
__export(require("./attrs"));
__export(require("./enums"));
__export(require("./redux"));
var Login = (function () {
    function Login(username, password) {
        this.username = username;
        this.password = password;
    }
    return Login;
}());
__decorate([
    attrs_1.Path(),
    __metadata("design:type", String)
], Login.prototype, "username", void 0);
__decorate([
    attrs_1.Query(),
    __metadata("design:type", String)
], Login.prototype, "password", void 0);
Login = __decorate([
    attrs_1.HttpGet('/api/login/{username}'),
    __metadata("design:paramtypes", [String, String])
], Login);
var middleware = redux_1.reduxHttpMiddleware()({})(function (x) { return x; });
middleware({
    data: new Login('admin', '123')
});
