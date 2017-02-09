import {HttpOptions, getHttpOptions, getHttpProps} from "./attrs";
import {HttpOptionPlace} from "./enums";

export class RequestModel
{

    public readonly message : any;

    public readonly payload : any;

    public readonly options : HttpOptions;

    private _query : any = {};
    private _body : any = {};

    constructor(message : any) {
        this.message = message;
        this.options = getHttpOptions(message);
        this.payload = getHttpProps(message);

        this.preparePayload();
    }

    private preparePayload()
    {
        Object.keys(this.message)
            .map(key => this.payload.find(x => x.name == key))
            .filter(prop => prop !== null)
            .forEach(prop => {
                switch (prop.type) {
                    case HttpOptionPlace.Body:
                        this._body[prop.name] = this.message[prop.name];
                        break;
                    case HttpOptionPlace.Query:
                        this._query[prop.name] = this.message[prop.name];
                        break;
                }
            })
    }

    public get queryString() {
        return formatQuery(this._query);
    }

    public get query() {
        return this._query;
    }

    public get method() {
        return this.options.methodName;
    }

    public get body() {
        return this._body;
    }

    public get url() {
        return formatUrl(this.options.url, this.message);
    }

}

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