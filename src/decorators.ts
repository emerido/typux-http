import {metadata} from "typux";

const HTTP = Symbol('typux.http');

export enum HttpMethod
{
    GET,
    PUT,
    HEAD,
    POST,
    PATCH,
    DELETE,
    OPTIONS
}

export class HttpOptions
{

    public url : string;

    public method : HttpMethod;

    public setEndpoint(url : string, method : HttpMethod) {
        this.url = url;
        this.method = method;
    }

}

export function Http(url : string, method = HttpMethod.GET) : ClassDecorator {
    return function (target) {
        ensureHttpOptions(target).setEndpoint(url, method);
    }
}

export function hasHttpOptions(message : Object) : boolean {
    return metadata.getClassInfo(message.constructor).hasAttribute(HTTP);
}

export function getHttpOptions(target) : HttpOptions
{
    let info = metadata.getClassInfo(typeof target === 'function' ? target : target.constructor);
    if (false === info.hasAttribute(HTTP)) {
        throw new Error(`Class ${info.name} doesn\'t have http options`);
    }
    return info.getAttribute(HTTP);
}

function ensureHttpOptions(target) : HttpOptions {
    let info = metadata.getClassInfo(typeof target === 'function' ? target : target.constructor);
    if (info.hasAttribute(HTTP) === false) {
        info.setAttribute(HTTP, new HttpOptions());
    }
    return info.getAttribute(HTTP);
}