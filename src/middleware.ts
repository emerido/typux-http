import 'whatwg-fetch';
import {Middleware} from "redux";
import {HttpMethod} from "./enums";

import {formatUrl, composeBody, composeQuery} from "./helpers";
import {hasHttpOptions, getHttpProps, getHttpOptions} from "./methods";


export function typuxHttpMiddleware(options? : IHttpMiddlewareOptions) : Middleware
{
    return store => next => action => {
        if (action.data && hasHttpOptions(action.data)) {
            let params = getHttpProps(action.data);
            let options = getHttpOptions(action.data);

            let body = options.hasBody()
                ? composeBody(action.data, params)
                : null;

            let url = formatUrl(options.url, action.data);
            let query = composeQuery(action.data, params);

            if (query && query.length) {
                url += url.indexOf('?') == -1
                    ? '?' + query
                    : '&' + query
            }

            let payload = options.hasBody() ? new FormData() : null;
            if (payload && body.length) {
                body.forEach(pair => {
                    payload.append(pair[0], pair[1]);
                })
            }

            let request = new Request(url, {
                method : HttpMethod[options.method].toUpperCase(),
                body : payload
            });

            // TODO
            let promise = fetch(request)
                .catch(x => console.log('Http Error', x))
                ;
        }
        next(action)
    }

}

export interface IInterceptor
{

    onError? : () => void;
    onRequest? : (request : Request) => void;
    onResponse? : (response : Response) => void;

}


export interface IHttpMiddlewareOptions
{

    interceptors? : IInterceptor[];

}