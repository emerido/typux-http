
import {HttpOptions, HTTP, HTTP_PARAM} from "./decorators";
import {metadata} from "typux";
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
    return metadata.getClassInfo(message.constructor).hasAttribute(HTTP);
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
    let info = metadata.getClassInfo(typeof target === 'function' ? target : target.constructor);
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
    let info = metadata.getClassInfo(typeof target === 'function' ? target : target.constructor);
    if (info.hasAttribute(HTTP) === false) {
        info.setAttribute(HTTP, new HttpOptions());
    }
    return info.getAttribute(HTTP);
}