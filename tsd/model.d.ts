/// <reference types="isomorphic-fetch" />
import { HttpMethod, HttpParameterType } from "./enums";
import { Constructable, Dictionary } from "typux";
export declare class Url {
    private _url;
    private _query;
    private _params;
    setUrl(url: string): this;
    setQuery(name: string, value: any): this;
    setParam(name: string, value: any): this;
    setParams(params: Dictionary<any>): this;
    toString(): string;
}
export declare class Body {
    private _content;
    constructor(content?: string);
    set(name: string, value: any): void;
}
export declare class Request {
    private _url;
    private _body;
    private _method;
    private _headers;
    constructor(url?: Url, method?: HttpMethod, body?: Body, headers?: Headers);
    readonly url: Url;
    readonly body: Body;
    readonly method: HttpMethod;
    readonly methodName: string;
    readonly headers: Headers;
    setUrl(url: string, params?: Dictionary<any>): this;
    setMethod(method: HttpMethod): this;
}
export declare class Response {
    body: Body;
    private _body;
    private _status;
    private _headers;
    status: number;
    headers: Headers;
}
export declare class HttpRequestAttribute {
    pattern: string;
    method: HttpMethod;
    params: Dictionary<any>;
    query: Dictionary<any>;
    body: Dictionary<any>;
    constructor(endpoint: string, method: HttpMethod);
    onRequest(request: Request, message: any): Request;
}
export declare class HttpReceiveAttribute {
    messages: Constructable<any>[];
    constructor(messages: Constructable<any>[]);
}
export declare class HttpResponseAttribute {
    code: number;
    constructor(code: number);
}
export declare class HttpParameterAttribute {
    type: HttpParameterType;
    alias?: string;
    constructor(type: HttpParameterType, alias?: string);
    onRequest(key: string, request: Request, message: any): void;
}
