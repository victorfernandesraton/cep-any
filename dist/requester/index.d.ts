/**
 *
 * @param {{
 * 	url: string,
 * body?: any
 * params?: any
 * method?: 'GET' | 'POST' | 'DELETE'
 * headers?: any
 * }}
 * @returns {Promise<{
 * json(): Promise<any>
 * text(): Promise<string>
 * ok: boolean
 * status: number
 * }>}
 */
export function Requester({ url, method, body, params, headers, }: {
    url: string;
    body?: any;
    params?: any;
    method?: 'GET' | 'POST' | 'DELETE';
    headers?: any;
}): Promise<{
    json(): Promise<any>;
    text(): Promise<string>;
    ok: boolean;
    status: number;
}>;
