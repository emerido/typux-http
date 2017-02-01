import 'whatwg-fetch';
import {Middleware} from "redux";
import {hasHttpOptions, getHttpOptions, HttpMethod} from "./decorators";

export interface HttpMiddlewareOptions
{

}


export function typuxHttpMiddleware(options? : HttpMiddlewareOptions) : Middleware
{

    return store => next => action => {
        if (action.data && hasHttpOptions(action.data)) {
            let options = getHttpOptions(action.data);

            let endpoint = templateUrl(options.url, action.data);
            let payload = options.method == HttpMethod.POST || options.method == HttpMethod.PUT
                ? new FormData()
                : null;

            Object.keys(action.data).forEach(key => {
                // TODO : Check property options
                payload && payload.append(key, action.data[key]);
            });

            let request = new Request(endpoint, {
                method : HttpMethod[options.method].toUpperCase(),
                body : payload
            });

            let promise = fetch(request)
                .catch(x => console.log('Http Error', x))
                ;
        }
        next(action)
    }

}

function templateUrl(url : string, data : any) {
    return url.replace(/\{(.+?)\}/g, function (_, match) {
        if (data.hasOwnProperty(match)) {
            return data[match];
        }
        return _;
    });
}