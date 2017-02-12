import { HttpMethod } from "./enums";
export declare class RequestModel {
    readonly message: any;
    readonly payload: any;
    readonly options: RequestAttribute;
    private _query;
    private _body;
    constructor(message: any);
    private preparePayload();
    readonly queryString: string;
    readonly query: any;
    readonly method: string;
    readonly body: any;
    readonly url: string;
}
export declare class RequestAttribute {
    url: string;
    method: HttpMethod;
    hasBody(): boolean;
    setEndpoint(url: string, method: HttpMethod): void;
    readonly methodName: string;
}
export declare class ResponseAttribute {
    code: number;
}
