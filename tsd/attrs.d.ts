import { HttpMethod, HttpOptionPlace } from "./enums";
export declare const HTTP: symbol;
export declare const HTTP_PARAM: symbol;
export declare class HttpOptions {
    url: string;
    method: HttpMethod;
    hasBody(): boolean;
    setEndpoint(url: string, method: HttpMethod): void;
    readonly methodName: string;
}
export declare function Http(url: string, method?: HttpMethod): ClassDecorator;
export declare function HttpGet(url: string): ClassDecorator;
export declare function HttpPut(url: string): ClassDecorator;
export declare function HttpPost(url: string): ClassDecorator;
export declare function HttpDelete(url: string): ClassDecorator;
export declare function HttpParam(place: HttpOptionPlace, name?: string): PropertyDecorator;
export declare function HttpResponse(code: number): ClassDecorator;
export declare function Ignore(): PropertyDecorator;
export declare function Body(): PropertyDecorator;
export declare function Query(): PropertyDecorator;
export declare function getHttpProps(message: Object): any;
/**
 * Returns `true` if http options exists in message instance
 *
 * @public
 * @param {Object} message Instance of message
 * @returns {boolean}
 */
export declare function hasHttpOptions(message: Object): boolean;
/**
 * Returns http options
 *
 * @public
 * @param {Function|Object} target
 * @returns {HttpOptions}
 */
export declare function getHttpOptions(target: any): HttpOptions;
/**
 * Returns http options for message or create if not exists
 *
 * @private
 * @param {Function|Object} target
 * @returns {HttpOptions}
 */
export declare function ensureHttpOptions(target: any): HttpOptions;
