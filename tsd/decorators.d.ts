import { HttpMethod, HttpOptionPlace } from "./enums";
export declare const HTTP: symbol;
export declare const HTTP_PARAM: symbol;
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
export declare function Body(): PropertyDecorator;
export declare function Query(): PropertyDecorator;
