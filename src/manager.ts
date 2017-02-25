import 'isomorphic-fetch';

import {Request as RequestModel, Response as ResponseModel} from "./model";

export class Manager
{

    public readonly config : ManagerConfig;

    constructor(config? : ManagerConfig) {
        this.config = config;
    }

    execute(model : RequestModel) : PromiseLike<ResponseModel>
    {
        let request = new Request(model.url, {
            method : model.method,
            // body : model.body TODO: convert body
        });

        let response = new ResponseModel();

        return fetch(request)
            .then(x => {
                response.status = x.status;
                x.headers.forEach((key, status) =>
                    response.headers[status] = x.headers.get(key)
                );
                return x.text();
            })
            .then(x => {
                response.data = x;
                return response;
            })
            .catch(x => {
                response.status = x.status || 500;
                response.data = x.text || x.message;
                return response;
            })
        ;

    }

}

export interface ManagerConfig
{

}