import 'isomorphic-fetch';
import { Request as RequestModel, Response as ResponseModel } from "./model";
export declare class Manager {
    readonly config: ManagerConfig;
    constructor(config?: ManagerConfig);
    private readonly urlBuilder;
    execute(model: RequestModel): Promise<ResponseModel>;
}
export declare class UrlBuilder {
    build(request: RequestModel): string;
}
export interface ManagerConfig {
    urlBuilder?: UrlBuilder;
}
