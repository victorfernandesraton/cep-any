import { AxiosResponse } from "axios";
import { BasicError } from "./basicError";
export declare class RequestError extends BasicError {
    readonly api: string;
    readonly response: AxiosResponse | undefined;
    constructor(message: string | undefined, api: string, request?: AxiosResponse);
}
//# sourceMappingURL=requestError.d.ts.map