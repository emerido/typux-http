import {HttpMethod, HttpParameterType} from "./enums";
import {Constructable, Dictionary} from "typux";
import {formatPath, formatQuery} from "./utils";


export class Url
{

    private _url: string;
    private _query: Dictionary<any> = {};
    private _params: Dictionary<any> = {};

    public setUrl(url : string) : this {
        this._url = url;
        return this;
    }

    public setQuery(name : string, value : any) : this {
        this._query[name] = value;
        return this;
    }

    public setParam(name : string, value : any) : this {
        this._params[name] = value;
        return this;
    }

    public setParams(params : Dictionary<any>) : this {
        this._params = params;
        return this;
    }

    public toString() {
        let path = formatPath(this._url, this._params);
        let query = formatQuery(this._query);

        if (query.length > 0) {
            return path + (path.indexOf('?') > -1 ? '&' : '?') + query;
        }
        return path;
    }
}

export class Body
{

    private _object : any = {};
    private _content : string;

    constructor(content: string = '') {
        this._content = content;
        this._object = JSON.parse(this._content || '{}');
    }

    public set(name : string, value : any) {
        this._content[name] = value;
    }

    public json() : any {
        return this._object;
    }

}

export class Request
{

    private _url : Url;
    private _body : Body;
    private _method : HttpMethod;
    private _headers : Headers;

    constructor(url?: Url, method?: HttpMethod, body?: Body, headers?: Headers) {
        this._url = url || new Url();
        this._body = body || new Body();
        this._method = method;
        this._headers = headers || new Headers();
    }

    get url(): Url {
        return this._url;
    }
    get body(): Body {
        return this._body;
    }
    get method(): HttpMethod {
        return this._method;
    }
    get methodName(): string {
        return HttpMethod[this._method].toUpperCase();
    }
    get headers(): Headers {
        return this._headers;
    }

    public setUrl(url : string, params : Dictionary<any> = {}) : this {
        this.url.setUrl(url).setParams(params);
        return this;
    }

    public setMethod(method : HttpMethod) : this {
        this._method = method;
        return this;
    }

}

export class Response
{
    get body(): Body {
        return this._body;
    }

    set body(value: Body) {
        this._body = value;
    }

    private _body : Body;
    private _status: number;
    private _headers : Headers;

    public set status(value : number) {
        this._status = value;
    }
    public get status() {
        return this._status;
    }

    get headers(): Headers {
        return this._headers;
    }

    set headers(value: Headers) {
        this._headers = value;
    }

}


export class HttpRequestAttribute
{

    public pattern : string;
    public method : HttpMethod;

    public params : Dictionary<any> = {};
    public query : Dictionary<any> = {};
    public body : Dictionary<any> = {};

    constructor(endpoint: string, method: HttpMethod) {
        this.pattern = endpoint;
        this.method = method;
    }

    public onRequest(request : Request, message : any) : Request
    {
        request.setUrl(this.pattern);
        request.setMethod(this.method);

        return request;
    }

}

export class HttpReceiveAttribute
{

    constructor(public messages : Constructable<any>[]) {
    }

}

export class HttpResponseAttribute
{

    public code : number;

    constructor(code: number) {
        this.code = code;
    }

}

export class HttpParameterAttribute
{

    public type : HttpParameterType;
    public alias? : string;

    constructor(type: HttpParameterType, alias?: string) {
        this.type = type;
        this.alias = alias;
    }

    public onRequest(key : string, request : Request, message : any) : void {
        const name = this.alias || key;
        const value = message[key];

        switch (this.type) {
            case HttpParameterType.Path:
                request.url.setParam(name, value); break;
            case HttpParameterType.Body:
                request.body.set(name, value); break;
            case HttpParameterType.Query:
                request.url.setQuery(name, value)
        }
    }

}