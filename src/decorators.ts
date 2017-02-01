import {metadata} from "typux";

const HTTP = Symbol('typux.http');

export enum HttpMethod
{
    GET,
    POST,
    PUT,
    DELETE,
    OPTIONS
}



export function Http(url : string, method = HttpMethod.GET) : ClassDecorator {
    return function (target) {
        metadata.defineClassAttribute(target, HTTP, url);
    }
}