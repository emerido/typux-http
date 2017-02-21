import {Attribute} from "typux";
import {HttpMethod, HttpParameterType} from "./enums";
import {HttpParameterAttribute, HttpRequestAttribute, HttpResponseAttribute} from "./model";

export const HttpRequest = (url : string, method : HttpMethod) =>
    Attribute(new HttpRequestAttribute(url, method)) as ClassDecorator;

export const HttpGet = (url : string) => HttpRequest(url, HttpMethod.GET);
export const HttpPut = (url : string) => HttpRequest(url, HttpMethod.PUT);
export const HttpPost = (url : string) => HttpRequest(url, HttpMethod.POST);
export const HttpDelete = (url : string) => HttpRequest(url, HttpMethod.DELETE);

export const HttpResponse = (code : number) =>
    Attribute(new HttpResponseAttribute(code)) as ClassDecorator;

export const HttpParameter = (type : HttpParameterType, alias? : string) =>
    Attribute(new HttpParameterAttribute(type, alias)) as PropertyDecorator;

export const Path = (alias? : string) => HttpParameter(HttpParameterType.Path);
export const Body = (alias? : string) => HttpParameter(HttpParameterType.Body);
export const Query = (alias? : string) => HttpParameter(HttpParameterType.Query);
export const Ignore = (alias? : string) => HttpParameter(HttpParameterType.Ignore);
