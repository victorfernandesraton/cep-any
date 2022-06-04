/**
 *
 * @param {{
 * 	url: string,
 * body?: any
 * params?: any
 * method?: 'GET' | 'POST' | 'DELETE'
 * }}
 * @returns Promise<Response>
 */
export function Requester({ url, body = null, params = null, method = "GET" }) {
	const searchParams = new URLSearchParams();
	if (params) {
		for (const key in params) {
			searchParams.set(key, searchParams[key]);
		}
	}
	const URL = `${url}${searchParams.toString()}`;
	console.log(URL);
	return fetch(url, {
		method,
		body,
	});
}
