import 'whatwg-fetch';
import {Middleware} from "redux";
import {hasHttpOptions} from "./decorators";

export interface HttpMiddlewareOptions
{

}


export function typuxHttpMiddleware(options? : HttpMiddlewareOptions) : Middleware
{

    return store => next => action => {
        if (action.data && hasHttpOptions(action.data)) {
            // TODO : Add requests
            console.log(action);
        }
        next(action)
    }

}