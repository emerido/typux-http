"use strict";
var enums_1 = require("./enums");
var utils_1 = require("./utils");
var Url = (function () {
    function Url() {
        this._query = {};
        this._params = {};
    }
    Url.prototype.setUrl = function (url) {
        this._url = url;
        return this;
    };
    Url.prototype.setQuery = function (name, value) {
        this._query[name] = value;
        return this;
    };
    Url.prototype.setParam = function (name, value) {
        this._params[name] = value;
        return this;
    };
    Url.prototype.setParams = function (params) {
        this._params = params;
        return this;
    };
    Url.prototype.toString = function () {
        var path = utils_1.formatPath(this._url, this._params);
        var query = utils_1.formatQuery(this._query);
        if (query.length > 0) {
            return path + (path.indexOf('?') > -1 ? '&' : '?') + query;
        }
        return path;
    };
    return Url;
}());
exports.Url = Url;
var Body = (function () {
    function Body(content) {
        if (content === void 0) { content = ''; }
        this._object = {};
        this._content = content;
        this._object = JSON.parse(this._content || '{}');
    }
    Body.prototype.set = function (name, value) {
        this._content[name] = value;
    };
    Body.prototype.json = function () {
        return this._object;
    };
    return Body;
}());
exports.Body = Body;
var Request = (function () {
    function Request(url, method, body, headers) {
        this._url = url || new Url();
        this._body = body || new Body();
        this._method = method;
        this._headers = headers || new Headers();
    }
    Object.defineProperty(Request.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "body", {
        get: function () {
            return this._body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "method", {
        get: function () {
            return this._method;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "methodName", {
        get: function () {
            return enums_1.HttpMethod[this._method].toUpperCase();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        enumerable: true,
        configurable: true
    });
    Request.prototype.setUrl = function (url, params) {
        if (params === void 0) { params = {}; }
        this.url.setUrl(url).setParams(params);
        return this;
    };
    Request.prototype.setMethod = function (method) {
        this._method = method;
        return this;
    };
    return Request;
}());
exports.Request = Request;
var Response = (function () {
    function Response() {
    }
    Object.defineProperty(Response.prototype, "body", {
        get: function () {
            return this._body;
        },
        set: function (value) {
            this._body = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        set: function (value) {
            this._headers = value;
        },
        enumerable: true,
        configurable: true
    });
    return Response;
}());
exports.Response = Response;
var HttpRequestAttribute = (function () {
    function HttpRequestAttribute(endpoint, method) {
        this.params = {};
        this.query = {};
        this.body = {};
        this.pattern = endpoint;
        this.method = method;
    }
    HttpRequestAttribute.prototype.onRequest = function (request, message) {
        request.setUrl(this.pattern);
        request.setMethod(this.method);
        return request;
    };
    return HttpRequestAttribute;
}());
exports.HttpRequestAttribute = HttpRequestAttribute;
var HttpReceiveAttribute = (function () {
    function HttpReceiveAttribute(messages) {
        this.messages = messages;
    }
    return HttpReceiveAttribute;
}());
exports.HttpReceiveAttribute = HttpReceiveAttribute;
var HttpResponseAttribute = (function () {
    function HttpResponseAttribute(code) {
        this.code = code;
    }
    return HttpResponseAttribute;
}());
exports.HttpResponseAttribute = HttpResponseAttribute;
var HttpParameterAttribute = (function () {
    function HttpParameterAttribute(type, alias) {
        this.type = type;
        this.alias = alias;
    }
    HttpParameterAttribute.prototype.onRequest = function (key, request, message) {
        var name = this.alias || key;
        var value = message[key];
        switch (this.type) {
            case enums_1.HttpParameterType.Path:
                request.url.setParam(name, value);
                break;
            case enums_1.HttpParameterType.Body:
                request.body.set(name, value);
                break;
            case enums_1.HttpParameterType.Query:
                request.url.setQuery(name, value);
        }
    };
    return HttpParameterAttribute;
}());
exports.HttpParameterAttribute = HttpParameterAttribute;
