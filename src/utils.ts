
/**
 * Formats template url
 *
 * @param {string} url
 * @param {object} data
 *
 * @returns {string}
 */
export function formatUrl(url : string, data : any) {
    return url.replace(/\{(.+?)\}/g, function (_, match) {
        if (data.hasOwnProperty(match)) {
            return data[match];
        }
        return _;
    });
}

/**
 * Formats query object
 *
 * @param {object} data
 * @param {string?} prefix
 *
 * @returns {string}
 */
export function formatQuery(data : any, prefix? : string) : string {
    let parts = [],
        prop;

    for(prop in data) {
        if (data.hasOwnProperty(prop) === false) {
            continue
        }
        let key = prefix ? prefix + "[" + prop + "]" : prop, value = data[prop];
        parts.push((value !== null && typeof value === "object") ?
            formatQuery(value, key) :
            encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
    return parts.join("&");
}