export declare enum HttpMethod {
    GET = 0,
    POST = 1,
    PUT = 2,
    DELETE = 3,
    OPTIONS = 4,
}
export declare function Http(url: string, method?: HttpMethod): ClassDecorator;
