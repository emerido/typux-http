import {PropertyInfo} from "typux";
import {HttpOptionPlace} from "./decorators";
export function formatUrl(url : string, data : any) {
    return url.replace(/\{(.+?)\}/g, function (_, match) {
        if (data.hasOwnProperty(match)) {
            return data[match];
        }
        return _;
    });
}

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

export function composeBody(data : any, props : any[]) : any[]
{
    return Object.keys(data)
        .map(key => {
            let prop = props.find(x => x.name == key);
            if (prop == null || prop.type === HttpOptionPlace.Body) {
                return [key, data[key]];
            }
        })
        .filter(x => x != null);
}

export function composeQuery(data : any, props : PropertyInfo[]) : string
{
    let result = {};
    Object.keys(data).map(key => {
        let prop = props.find(x => x.name == key);
        if (prop == null || prop.type === HttpOptionPlace.Query) {
            result[key] = data[key];
        }
    });
    return formatQuery(result);
}