/**
 * @param {{
 * url: string,
 * method?: "GET"| "POST"| "PUT",
 * body?: any,
 * params?: any,
 * headers?: any
 * }} param0
 * @returns {{
	* json: () =>Promise<any>
	* text: () =>Promise<string>
	* ok: boolean,
	* status: number
	*}}
 */
export function Requester({
	url,
	method = "GET",
	body,
	params,
	headers,
}) {
	const searchParams = new URLSearchParams()
	const options = {
		method,
		body,
		headers
	}
	if (params) {
		for (const key in params) {
			searchParams.set(key, params[key])
		}
	}

	const URL = `${url}?${searchParams.toString()}`

	return fetch(URL, options)
}
