import 'isomorphic-fetch';

import {formatQuery, formatUrl} from "./utils";
import {Request as RequestModel, Response as ResponseModel} from "./model";

export class Manager
{

    public readonly config : ManagerConfig;

    constructor(config? : ManagerConfig) {
        this.config = config || {};
    }

    private get urlBuilder() {
        return this.config.urlBuilder || (this.config.urlBuilder = new UrlBuilder());
    }

    execute(model : RequestModel) : Promise<ResponseModel>
    {
        // TODO : Add typux-model peer dependency
        // TODO : Add url params transform
        // TODO : Add response action dispatch

        let url = this.urlBuilder.build(model);

        let request = new Request(url, {
            method : model.method,
            // body : model.body TODO: convert body
        });

        let response = new ResponseModel();

        return fetch(request)
            .then(x => {
                response.status = x.status;
                // Copy headers
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

                // TODO : Separate local error handling
                response.status = x.status || 500;
                response.data = x;
                throw response;
            })
        ;

    }

}

export class UrlBuilder
{

    build(request : RequestModel) : string {

        let query = formatQuery(request.query);
        let path = formatUrl(request.url, request.params);

        return path + (path.indexOf('?') > -1 ? '&' : '?') + query;
    }

}

export interface ManagerConfig
{
    urlBuilder? : UrlBuilder;
}