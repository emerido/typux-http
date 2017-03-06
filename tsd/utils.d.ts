export declare function isHttpRequest(data: any): boolean;
export declare function formatUrl(url: string, data: any): string;
/**
 * Formats template pattern
 *
 * @param {string} url
 * @param {object} data
 *
 * @returns {string}
 */
export declare function formatPath(url: string, data: any): string;
/**
 * Formats query object
 *
 * @param {object} data
 * @param {string?} prefix
 *
 * @returns {string}
 */
export declare function formatQuery(data: any, prefix?: string): string;
