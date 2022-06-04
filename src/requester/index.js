/**
 *
 * @param {{
 * 	url: string,
 * body?: any
 * params?: any
 * method?: 'GET' | 'POST' | 'DELETE'
 * headers?: any
 * }}
 * @returns Promise<Response>
 */
export function Requester({
	url,
	method = "GET",
	body = null,
	params = null,
	headers = null,
}) {
	const searchParams = new URLSearchParams();
	if (params) {
		for (const key in params) {
			searchParams.set(key, searchParams[key]);
		}
	}
	const options = {
		method,
		body,
	};
	if (headers) {
		options.headers = headers;
	}
	const URL = `${url}${searchParams.toString()}`;
	return fetch(URL, options);
}
