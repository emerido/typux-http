import {getHttpOptions, getHttpProps} from "./attrs";
import {HttpMethod, HttpOptionPlace} from "./enums";
import {formatQuery, formatUrl} from "./utils";

export class RequestModel
{

    public readonly message : any;

    public readonly payload : any;

    public readonly options : RequestAttribute;

    private _query : any = {};
    private _body : any = {};

    constructor(message : any) {
        this.message = message;
        this.options = getHttpOptions(message);
        this.payload = getHttpProps(message);

        this.preparePayload();
    }

    private preparePayload()
    {
        Object.keys(this.message)
            .map(key => this.payload.find(x => x.name == key))
            .filter(prop => prop !== null)
            .forEach(prop => {
                switch (prop.type) {
                    case HttpOptionPlace.Body:
                        this._body[prop.name] = this.message[prop.name];
                        break;
                    case HttpOptionPlace.Query:
                        this._query[prop.name] = this.message[prop.name];
                        break;
                }
            })
    }

    public get queryString() {
        return formatQuery(this._query);
    }

    public get query() {
        return this._query;
    }

    public get method() {
        return this.options.methodName;
    }

    public get body() {
        return this._body;
    }

    public get url() {
        return formatUrl(this.options.url, this.message);
    }

}

export class RequestAttribute
{

    public url : string;

    public method : HttpMethod;

    public hasBody() : boolean {
        return this.method
            && this.method === HttpMethod.POST
            || this.method === HttpMethod.PUT
            ;
    }

    public setEndpoint(url : string, method : HttpMethod) {
        this.url = url;
        this.method = method;
    }

    public get methodName()
    {
        return HttpMethod[this.method].toUpperCase();
    }

}

export class ResponseAttribute
{

    public code : number;

}