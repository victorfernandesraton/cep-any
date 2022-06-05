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
 * ok: boolean
 * status: number
 * }>}
 */
export function Requester({
	url,
	method = "GET",
	body = null,
	params = null,
	headers = null,
}) {
	const searchParams = new URLSearchParams();
	const options = {
		method,
		body,
	};
	if (params) {
		for (const key in params) {
			searchParams.set(key, params[key]);
		}
	}
	if (headers) {
		options.headers = headers;
	}
	const URL = `${url}${searchParams.toString()}`;

	return fetch(URL, options);
}
