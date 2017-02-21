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
var HttpParameterType;
(function (HttpParameterType) {
    HttpParameterType[HttpParameterType["Ignore"] = 0] = "Ignore";
    HttpParameterType[HttpParameterType["Query"] = 1] = "Query";
    HttpParameterType[HttpParameterType["Body"] = 2] = "Body";
    HttpParameterType[HttpParameterType["Path"] = 3] = "Path";
})(HttpParameterType = exports.HttpParameterType || (exports.HttpParameterType = {}));
