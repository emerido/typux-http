import {HttpMethod, HttpParameterType} from "./enums";
import {Constructable, Dictionary, reflect} from "typux";

export class Request
{

    public url : string;

    public method : string;

    public body : Dictionary<any> = {};
    public query : Dictionary<any> = {};
    public params : Dictionary<any> = {};
    public headers : Dictionary<string> = {};

}

export class Response
{
    public status : number;
    public content : string;
    public headers : Dictionary<string> = {};
    public data? : any;

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
        request.url = this.pattern;
        request.method = HttpMethod[this.method].toUpperCase();

        let parameters = reflect.getClassInfo(message).getProperties()
            .filter(x => x.hasAttribute(HttpParameterAttribute));

        parameters
            .filter(x => x.getAttribute(HttpParameterAttribute).type == HttpParameterType.Path)
            .forEach(x => {
                request.params[x.name] = message[x.name];
            });

        parameters
            .filter(x => x.getAttribute(HttpParameterAttribute).type == HttpParameterType.Query)
            .forEach(x => {
                request.query[x.name] = message[x.name];
            });

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

}