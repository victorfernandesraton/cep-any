declare type RequesterParams = {
    url: string;
    method?: "GET" | "POST" | "PUT";
    body?: any;
    params?: any;
    headers?: any;
};
declare type RequesterResponse = {
    json: () => Promise<any>;
    text: () => Promise<string>;
    ok: boolean;
    status: number;
};
export declare function Requester({ url, method, body, params, headers, }: RequesterParams): Promise<RequesterResponse>;
export {};
