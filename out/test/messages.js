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
var attrs_1 = require("../attrs");
var PostFetched = (function () {
    function PostFetched() {
    }
    return PostFetched;
}());
PostFetched = __decorate([
    attrs_1.HttpResponse(200)
], PostFetched);
exports.PostFetched = PostFetched;
var FetchPost = (function () {
    function FetchPost(id) {
        this.id = id;
    }
    return FetchPost;
}());
__decorate([
    attrs_1.Path(),
    __metadata("design:type", Number)
], FetchPost.prototype, "id", void 0);
FetchPost = __decorate([
    attrs_1.HttpGet('http://jsonplaceholder.typicode.com/posts/{id}'),
    attrs_1.HttpReceive(PostFetched),
    __metadata("design:paramtypes", [Number])
], FetchPost);
exports.FetchPost = FetchPost;
