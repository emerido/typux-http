export declare enum HttpMethod {
    GET = 0,
    PUT = 1,
    HEAD = 2,
    POST = 3,
    PATCH = 4,
    DELETE = 5,
    OPTIONS = 6,
}
export declare enum HttpOptionPlace {
    Ignore = 0,
    Query = 1,
    Body = 2,
}
export declare class HttpOptions {
    url: string;
    method: HttpMethod;
    hasBody(): boolean;
    setEndpoint(url: string, method: HttpMethod): void;
}
export declare function Http(url: string, method?: HttpMethod): ClassDecorator;
export declare function Get(url: string): ClassDecorator;
export declare function Put(url: string): ClassDecorator;
export declare function Post(url: string): ClassDecorator;
export declare function Delete(url: string): ClassDecorator;
export declare function HttpParam(place: HttpOptionPlace, name?: string): PropertyDecorator;
export declare function Ignore(): PropertyDecorator;
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
