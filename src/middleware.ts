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
            let promise = fetch(options.url, {
                method : HttpMethod[options.method].toUpperCase()
            });

            promise.catch(x => console.log('Http Error', x));
        }
        next(action)
    }

}