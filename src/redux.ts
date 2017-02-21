import 'whatwg-fetch';
import {Middleware} from "redux";

import {isHttpRequest} from "./attrs";
import {RequestModel} from "./model";


export function reduxHttpMiddleware(options? : IHttpMiddlewareOptions) : Middleware
{
    return store => next => action => {
        if (action.data && isHttpRequest(action.data)) {
            let builder = new RequestModel(action.data);

            let url = builder.url;
            let body = builder.body;
            let query = builder.queryString;

            if (query && query.length) {
                url += url.indexOf('?') == -1
                    ? '?' + query
                    : '&' + query
            }

            let payload = builder.options.hasBody() ? new FormData() : null;
            if (payload && body.length) {
                body.forEach(pair => {
                    payload.append(pair[0], pair[1]);
                })
            }

            let request = new Request(url, {
                method : builder.method,
                body : payload
            });

            // let receive =

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