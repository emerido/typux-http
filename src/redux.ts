import {reflect} from "typux";
import {Middleware} from "redux";
import {isHttpRequest} from "./utils";
import {HttpRequestAttribute, Request as TypuxRequest} from "./model";
import {Manager} from "./manager";


export function reduxHttpMiddleware() : Middleware
{
    let manager = new Manager();
    return store => next => action => {
        if (action.data && isHttpRequest(action.data)) {
            let requestAttributes = reflect.getClassInfo(action.data)
                .getAttributes(HttpRequestAttribute);

            let requestModel = requestAttributes
                .reduce((r, a) => a.onRequest(r, action.data), new TypuxRequest());

            manager.execute(requestModel)
                .then(console.log);

            console.log(requestModel);
        }
        next(action)
    }

}