import {metadata} from "typux";
import {HttpMethod, HttpOptionPlace} from "./enums";
import {ensureHttpOptions} from "./methods";

export const HTTP = Symbol('typux.http');
export const HTTP_PARAM = Symbol('typux.http.param');


export class HttpOptions
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

}



export function Http(url : string, method : HttpMethod = HttpMethod.GET) : ClassDecorator {
    return function (target) {
        ensureHttpOptions(target).setEndpoint(url, method);
    }
}

export function Get(url : string) : ClassDecorator {
    return Http(url, HttpMethod.GET)
}

export function Put(url : string) : ClassDecorator {
    return Http(url, HttpMethod.PUT)
}

export function Post(url : string) : ClassDecorator {
    return Http(url, HttpMethod.POST)
}

export function Delete(url : string) : ClassDecorator {
    return Http(url, HttpMethod.DELETE)
}

export function HttpParam(place : HttpOptionPlace, name? : string) : PropertyDecorator {
    return function (target: Object, property: string) {
        metadata.definePropertyAttribute(target, property, HTTP_PARAM, place)
    }
}

export function Ignore() : PropertyDecorator
{
    return HttpParam(HttpOptionPlace.Ignore);
}

export function Body() : PropertyDecorator
{
    return HttpParam(HttpOptionPlace.Body);
}

export function Query() : PropertyDecorator
{
    return HttpParam(HttpOptionPlace.Query);
}
