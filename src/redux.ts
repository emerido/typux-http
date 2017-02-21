import 'whatwg-fetch';
import {Middleware} from "redux";
import {isHttpRequest} from "./utils";
import {HttpRequestAttribute, Request as TypuxRequest} from "./model";
import {reflect} from "typux";


export function reduxHttpMiddleware() : Middleware
{
    return store => next => action => {
        if (action.data && isHttpRequest(action.data)) {
            let requestAttributes = reflect.getClassInfo(action.data)
                .getAttributes(HttpRequestAttribute);

            let requestModel = requestAttributes
                .reduce((r, a) => a.compose(r, action.data), new TypuxRequest());

            console.log(requestModel);
        }
        next(action)
    }

}