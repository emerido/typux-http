import { HttpMethod, HttpOptionPlace } from "./enums";
import { RequestAttribute } from "./model";
export declare const HTTP_PARAM: symbol;
export declare const HTTP_REQUEST: symbol;
export declare const HTTP_RECEIVE: symbol;
export declare const HTTP_RESPONSE: symbol;
export declare function Http(url: string, method?: HttpMethod): ClassDecorator;
export declare function HttpGet(url: string): ClassDecorator;
export declare function HttpPut(url: string): ClassDecorator;
export declare function HttpPost(url: string): ClassDecorator;
export declare function HttpDelete(url: string): ClassDecorator;
export declare function HttpReceive(...messages: any[]): ClassDecorator;
export declare function HttpResponse(code: number): ClassDecorator;
export declare function HttpParam(place: HttpOptionPlace, name?: string): PropertyDecorator;
export declare function Ignore(): PropertyDecorator;
export declare function Body(): PropertyDecorator;
export declare function Query(): PropertyDecorator;
/**
 * Returns http params for request message
 * @param {Object} message
 * @returns {[{name: (string|symbol), type: any}]}
 */
export declare function getHttpProps(message: Object): any;
/**
 * Returns `true` if http options exists in message instance
 *
 * @public
 * @param {Object} message Instance of message
 * @returns {boolean}
 */
export declare function isHttpRequest(message: Object): boolean;
/**
 * Returns `true` if message is http response
 *
 * @public
 * @param {Object} message
 * @returns {boolean}
 */
export declare function isHttpResponse(message: Object): any;
/**
 * Returns http options
 *
 * @public
 * @param {Function|Object} target
 * @returns {RequestAttribute}
 */
export declare function getHttpOptions(target: any): RequestAttribute;
