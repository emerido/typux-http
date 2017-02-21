import {HttpMethod, HttpParameterType} from "./enums";
import {Dictionary, reflect} from "typux";
import {formatUrl} from "./utils";

export class Request
{
    public url : string;
    public body : Dictionary<any> = {};
    public query : Dictionary<any> = {};
    public method : string;
    public headers : Dictionary<string> = {};
}

export class Response
{
    public status : number;
    public content : string;
    public headers : Dictionary<string>;
    public data? : any;
}

export class HttpRequestAttribute
{
    public url : string;
    public method : HttpMethod;

    constructor(url: string, method: HttpMethod) {
        this.url = url;
        this.method = method;
    }

    public compose(request : Request, data : any) : Request
    {
        let parameters = reflect.getClassInfo(data).getProperties()
            .filter(x => x.hasAttribute(HttpParameterAttribute));

        let routeParams = parameters
            .filter(x => x.getAttribute(HttpParameterAttribute).type == HttpParameterType.Path)
            .reduce((dict, param) => {
                // TODO : Added getter for param name
                dict[param.name] = data[param.name];
                return dict;
            }, {});


        let queryParams = parameters
            .filter(x => x.getAttribute(HttpParameterAttribute).type == HttpParameterType.Query)
            .forEach(x => {
                request.query[x.name] = data[x.name];
            });

        request.url = formatUrl(this.url, routeParams);

        return request;
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