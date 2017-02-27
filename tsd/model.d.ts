import { HttpMethod, HttpParameterType } from "./enums";
import { Constructable, Dictionary } from "typux";
export declare class Request {
    url: string;
    method: string;
    body: Dictionary<any>;
    query: Dictionary<any>;
    params: Dictionary<any>;
    headers: Dictionary<string>;
}
export declare class Response {
    status: number;
    content: string;
    headers: Dictionary<string>;
    data?: any;
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
}
