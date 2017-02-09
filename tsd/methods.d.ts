import { HttpOptions } from "./decorators";
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
/**
 * Returns http options for message or create if not exists
 *
 * @private
 * @param {Function|Object} target
 * @returns {HttpOptions}
 */
export declare function ensureHttpOptions(target: any): HttpOptions;
