import 'isomorphic-fetch';
import { Request as RequestModel, Response as ResponseModel } from "./model";
export declare class Manager {
    readonly config: ManagerConfig;
    constructor(config?: ManagerConfig);
    execute(model: RequestModel): PromiseLike<ResponseModel>;
}
export interface ManagerConfig {
}
