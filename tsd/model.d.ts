import { HttpOptions } from "./attrs";
export declare class RequestModel {
    readonly message: any;
    readonly payload: any;
    readonly options: HttpOptions;
    private _query;
    private _body;
    constructor(message: any);
    private preparePayload();
    readonly queryString: string;
    readonly query: any;
    readonly method: string;
    readonly body: any;
    readonly url: string;
}
/**
 * Formats template url
 *
 * @param {string} url
 * @param {object} data
 *
 * @returns {string}
 */
export declare function formatUrl(url: string, data: any): string;
/**
 * Formats query object
 *
 * @param {object} data
 * @param {string?} prefix
 *
 * @returns {string}
 */
export declare function formatQuery(data: any, prefix?: string): string;
