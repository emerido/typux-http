export declare enum HttpMethod {
    GET = 0,
    PUT = 1,
    HEAD = 2,
    POST = 3,
    PATCH = 4,
    DELETE = 5,
    OPTIONS = 6,
}
export declare class HttpOptions {
    url: string;
    method: HttpMethod;
    setEndpoint(url: string, method: HttpMethod): void;
}
export declare function Http(url: string, method?: HttpMethod): ClassDecorator;
export declare function hasHttpOptions(message: Object): boolean;
export declare function getHttpOptions(target: any): HttpOptions;
