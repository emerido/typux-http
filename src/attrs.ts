import {reflect} from "typux";
import {HttpMethod, HttpOptionPlace} from "./enums";
import {RequestAttribute, ResponseAttribute} from "./model";

//region Symbols

export const HTTP_PARAM = Symbol('typux.http.param');
export const HTTP_REQUEST = Symbol('typux.http.request');
export const HTTP_RECEIVE = Symbol('typux.http.receive');
export const HTTP_RESPONSE = Symbol('typux.http.response');

//endregion

//region Request decorators
export function Http(url : string, method : HttpMethod = HttpMethod.GET) : ClassDecorator {
    return function (target) {
        ensureRequestAttribute(target).setEndpoint(url, method);
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

//endregion

//region Response decorators
export function HttpReceive(...messages : any[]) : ClassDecorator
{
    return target => {
        reflect.getClassInfo(target)
            .setAttribute(HTTP_RECEIVE, messages)
        ;
    }
}

export function HttpResponse(code : number) : ClassDecorator
{
    return function (target) {
        ensureResponseAttribute(target).code = code;
    }
}
//endregion

//region Request params decorators

export function HttpParam(place : HttpOptionPlace, name? : string) : PropertyDecorator {
    return function (target: Object, property: string) {
        reflect.definePropertyAttribute(target, property, HTTP_PARAM, place)
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

//endregion

/**
 * Returns http params for request message
 * @param {Object} message
 * @returns {[{name: (string|symbol), type: any}]}
 */
export function getHttpProps(message : Object) : any {
    return reflect.getClassInfo(message).getProperties()
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
export function isHttpRequest(message : Object) : boolean {
    return reflect.getClassInfo(message).hasAttribute(HTTP_REQUEST);
}

/**
 * Returns `true` if message is http response
 *
 * @public
 * @param {Object} message
 * @returns {boolean}
 */
export function isHttpResponse(message : Object) {
    return reflect.getClassInfo(message).hasAttribute(HTTP_RESPONSE);
}

/**
 * Returns http options
 *
 * @public
 * @param {Function|Object} target
 * @returns {RequestAttribute}
 */
export function getHttpOptions(target) : RequestAttribute
{
    let info = reflect.getClassInfo(target);
    if (false === info.hasAttribute(HTTP_REQUEST)) {
        throw new Error(`Class ${info.name} doesn\'t have http options`);
    }
    return info.getAttribute(HTTP_REQUEST);
}

/**
 * Returns http options for message or create if not exists
 *
 * @private
 * @param {Function|Object} target
 * @returns {RequestAttribute}
 */
function ensureRequestAttribute(target) : RequestAttribute {
    let info = reflect.getClassInfo(target);
    if (info.hasAttribute(HTTP_REQUEST) === false) {
        info.setAttribute(HTTP_REQUEST, new RequestAttribute());
    }
    return info.getAttribute(HTTP_REQUEST);
}

/**
 * Returns http response attribute instance
 *
 * @param {Object} target
 * @returns {ResponseAttribute}
 */
function ensureResponseAttribute(target) : ResponseAttribute {
    let info = reflect.getClassInfo(target);
    if (info.hasAttribute(HTTP_RESPONSE) === false) {
        info.setAttribute(HTTP_RESPONSE, new ResponseAttribute());
    }
    return info.getAttribute(HTTP_RESPONSE);
}