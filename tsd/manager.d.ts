import 'isomorphic-fetch';
import { Request } from "./model";
export declare class Manager {
    readonly config: ManagerConfig;
    constructor(config?: ManagerConfig);
    readonly requestBuilder: RequestBuilder;
    execute(message: any): Promise<any>;
}
export declare class RequestBuilder {
    build(message: any): Request;
}
export interface ManagerConfig {
}
