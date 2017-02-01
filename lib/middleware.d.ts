import 'whatwg-fetch';
import { Middleware } from "redux";
export interface HttpMiddlewareOptions {
}
export declare function typuxHttpMiddleware(options?: HttpMiddlewareOptions): Middleware;
