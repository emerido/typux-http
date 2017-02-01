export declare enum HttpMethod {
    GET = 0,
    POST = 1,
    PUT = 2,
    DELETE = 3,
    OPTIONS = 4,
}
export declare class HttpOptions {
    url: string;
    method: HttpMethod;
    setEndpoint(url: string, method: HttpMethod): void;
}
export declare function Http(url: string, method?: HttpMethod): ClassDecorator;
export declare function hasHttpOptions(message: Object): boolean;
export declare function getHttpOptions(target: any): HttpOptions;
