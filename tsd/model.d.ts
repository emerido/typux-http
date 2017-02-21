import { HttpMethod, HttpParameterType } from "./enums";
import { Dictionary } from "typux";
export declare class Request {
    url: string;
    body: Dictionary<any>;
    query: Dictionary<any>;
    method: string;
    headers: Dictionary<string>;
}
export declare class Response {
    status: number;
    content: string;
    headers: Dictionary<string>;
    data?: any;
}
export declare class HttpRequestAttribute {
    url: string;
    method: HttpMethod;
    constructor(url: string, method: HttpMethod);
    compose(request: Request, data: any): Request;
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
