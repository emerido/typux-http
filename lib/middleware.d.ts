/// <reference types="whatwg-fetch" />
import 'whatwg-fetch';
import { Middleware } from "redux";
export declare function typuxHttpMiddleware(options?: IHttpMiddlewareOptions): Middleware;
export interface IInterceptor {
    onError?: () => void;
    onRequest?: (request: Request) => void;
    onResponse?: (response: Response) => void;
}
export interface IHttpMiddlewareOptions {
    interceptors?: IInterceptor[];
}
