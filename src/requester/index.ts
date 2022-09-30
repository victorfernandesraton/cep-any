type RequesterParams = {
	url: string,
	method?: 'POST' | 'GET',
	body?: unknown,
	params?: unknown,
	headers?: unknown
}

export type RequestType = (params: RequesterParams) => Promise<unknown>
export function Requester({
	url,
	method = 'GET',
	body,
	params,
	headers,
}: RequesterParams) {
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

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return fetch(URL, options)
}
