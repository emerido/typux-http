import {reflect} from "typux";
import {Middleware} from "redux";
import {isHttpRequest} from "./utils";
import {HttpReceiveAttribute, HttpRequestAttribute, HttpResponseAttribute, Request as TypuxRequest} from "./model";
import {Manager} from "./manager";


export function reduxHttpMiddleware() : Middleware
{
    let manager = new Manager();
    return store => next => action => {
        if (action.data && isHttpRequest(action.data)) {

            let info = reflect.getClassInfo(action.data);

            // Get request attributes
            let requestAttributes = info
                .getAttributes(HttpRequestAttribute);

            // Build request model
            let requestModel = requestAttributes
                .reduce((r, a) => a.onRequest(r, action.data), new TypuxRequest());

            let receive : HttpReceiveAttribute = info.hasAttribute(HttpReceiveAttribute)
                ? info.getAttribute(HttpReceiveAttribute)
                : null;
            let responses = {};

            if (receive) {
                responses = receive.messages
                    .map(m => reflect.getClassInfo(m))
                    .filter(i => i.hasAttribute(HttpResponseAttribute))
                    .reduce((map, info) => {
                        let attr = info.getAttribute(HttpResponseAttribute) as HttpResponseAttribute;
                        map[attr.code] = info.type;
                        return map;
                    }, {});

            }

            manager.execute(requestModel)
                .then(x => {
                    if (false === responses.hasOwnProperty(x.status)) {
                        return x;
                    }
                    let message = responses[x.status];

                    // Simple binder :)
                    store.dispatch(Object.assign(new message(), JSON.parse(x.data)));
                })
                .catch(x => {

                });
        }
        next(action)
    }

}