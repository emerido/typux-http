import 'isomorphic-fetch';

import {Constructable, reflect} from "typux";
import {Request, Response, Body, HttpResponseAttribute} from "./model";
import {HttpRequestAttribute, HttpParameterAttribute, HttpReceiveAttribute} from "./model";

export class Manager
{

    public readonly config : ManagerConfig;

    constructor(config? : ManagerConfig) {
        this.config = config || {};
    }

    public get requestBuilder() {
        return new RequestBuilder();
    }

    public execute(message : any) : Promise<any>
    {
        const info = reflect.getClassInfo(message);

        const request = this.requestBuilder.build(message);

        const receive = info.getAttributes(HttpReceiveAttribute)
            .reduce((all, attr) => all.concat(attr.messages), [])
            .map(x => reflect.getClassInfo(x))
            .map(x => [x.getAttribute(HttpResponseAttribute), x.type]);

        const response = new Response();

        function process(response : Response) {
            const best = receive.find(x => x[0].code == response.status);
            if (best) {
                // TODO : User typux-model for mapping
                return Object.assign(new best[1](), response.body.json());
            }
        }

        return fetch(request.url.toString(), {
            headers: request.headers,
            method: request.methodName,
            body: request.body,
        })
            .then(x => {
                console.log(x.url);
                response.status = x.status;
                response.headers = x.headers;
                return x;
            })
            .then(x => x.text())
            .then(x => response.body = new Body(x))
            .then(x => response)
            .then(process)
    }


}

export class RequestBuilder
{

    build(message : any) : Request
    {
        const info = reflect.getClassInfo(message);

        // Get request attributes
        const requestAttributes = info
            .getAttributes(HttpRequestAttribute);

        if (requestAttributes.length === 0) {
            throw new Error('Can\'t execute non request message');
        }

        const request = requestAttributes
            .reduce((request, attr) => attr.onRequest(request, message), new Request()
            );

        info.getProperties()
            .filter(x => x.hasAttribute(HttpParameterAttribute))
            .forEach(x => {
                x.getAttributes(HttpParameterAttribute)
                    .forEach(a => a.onRequest(x.name, request, message))
            })
        ;

        return request;
    }

}

export interface ManagerConfig
{

}