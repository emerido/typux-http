"use strict";
var HttpMethod;
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["PUT"] = 1] = "PUT";
    HttpMethod[HttpMethod["HEAD"] = 2] = "HEAD";
    HttpMethod[HttpMethod["POST"] = 3] = "POST";
    HttpMethod[HttpMethod["PATCH"] = 4] = "PATCH";
    HttpMethod[HttpMethod["DELETE"] = 5] = "DELETE";
    HttpMethod[HttpMethod["OPTIONS"] = 6] = "OPTIONS";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var HttpOptionPlace;
(function (HttpOptionPlace) {
    HttpOptionPlace[HttpOptionPlace["Ignore"] = 0] = "Ignore";
    HttpOptionPlace[HttpOptionPlace["Query"] = 1] = "Query";
    HttpOptionPlace[HttpOptionPlace["Body"] = 2] = "Body";
})(HttpOptionPlace = exports.HttpOptionPlace || (exports.HttpOptionPlace = {}));
