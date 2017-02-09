import {metadata} from "typux";

import {HttpMethod, HttpOptionPlace} from "./enums";

export const HTTP = Symbol('typux.http');
export const HTTP_PARAM = Symbol('typux.http.param');

export class HttpOptions
{

    public url : string;

    public method : HttpMethod;

    public hasBody() : boolean {
        return this.method
            && this.method === HttpMethod.POST
            || this.method === HttpMethod.PUT
        ;
    }

    public setEndpoint(url : string, method : HttpMethod) {
        this.url = url;
        this.method = method;
    }

    public get methodName()
    {
        return HttpMethod[this.method].toUpperCase();
    }

}



export function Http(url : string, method : HttpMethod = HttpMethod.GET) : ClassDecorator {
    return function (target) {
        ensureHttpOptions(target).setEndpoint(url, method);
    }
}

export function HttpGet(url : string) : ClassDecorator {
    return Http(url, HttpMethod.GET)
}

export function HttpPut(url : string) : ClassDecorator {
    return Http(url, HttpMethod.PUT)
}

export function HttpPost(url : string) : ClassDecorator {
    return Http(url, HttpMethod.POST)
}

export function HttpDelete(url : string) : ClassDecorator {
    return Http(url, HttpMethod.DELETE)
}

export function HttpParam(place : HttpOptionPlace, name? : string) : PropertyDecorator {
    return function (target: Object, property: string) {
        metadata.definePropertyAttribute(target, property, HTTP_PARAM, place)
    }
}

export function HttpResponse(code : number) : ClassDecorator
{
    return function (target) {

    }
}

export function Ignore() : PropertyDecorator
{
    return HttpParam(HttpOptionPlace.Ignore);
}

export function Body() : PropertyDecorator
{
    return HttpParam(HttpOptionPlace.Body);
}

export function Query() : PropertyDecorator
{
    return HttpParam(HttpOptionPlace.Query);
}



export function getHttpProps(message : Object) : any {
    return metadata.getClassInfo(message).getProperties()
        .filter(x => x.hasAttribute(HTTP_PARAM))
        .map(x => ({
            name : x.name,
            type : x.getAttribute(HTTP_PARAM)
        }))
        ;
}

/**
 * Returns `true` if http options exists in message instance
 *
 * @public
 * @param {Object} message Instance of message
 * @returns {boolean}
 */
export function hasHttpOptions(message : Object) : boolean {
    return metadata.getClassInfo(message).hasAttribute(HTTP);
}

/**
 * Returns http options
 *
 * @public
 * @param {Function|Object} target
 * @returns {HttpOptions}
 */
export function getHttpOptions(target) : HttpOptions
{
    let info = metadata.getClassInfo(target);
    if (false === info.hasAttribute(HTTP)) {
        throw new Error(`Class ${info.name} doesn\'t have http options`);
    }
    return info.getAttribute(HTTP);
}

/**
 * Returns http options for message or create if not exists
 *
 * @private
 * @param {Function|Object} target
 * @returns {HttpOptions}
 */
export function ensureHttpOptions(target) : HttpOptions {
    let info = metadata.getClassInfo(target);
    if (info.hasAttribute(HTTP) === false) {
        info.setAttribute(HTTP, new HttpOptions());
    }
    return info.getAttribute(HTTP);
}