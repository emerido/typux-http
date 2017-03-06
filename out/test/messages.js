"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var Post = (function () {
    function Post() {
    }
    return Post;
}());
exports.Post = Post;
var PostFetched = (function (_super) {
    __extends(PostFetched, _super);
    function PostFetched() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PostFetched;
}(Post));
PostFetched = __decorate([
    attrs_1.HttpResponse(200)
], PostFetched);
exports.PostFetched = PostFetched;
var PostNotFound = (function () {
    function PostNotFound() {
    }
    return PostNotFound;
}());
PostNotFound = __decorate([
    attrs_1.HttpResponse(404)
], PostNotFound);
exports.PostNotFound = PostNotFound;
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
    attrs_1.HttpReceive(PostNotFound, PostFetched),
    __metadata("design:paramtypes", [Number])
], FetchPost);
exports.FetchPost = FetchPost;
