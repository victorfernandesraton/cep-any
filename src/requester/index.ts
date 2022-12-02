export type RequesterParams = {
	url: string,
	method?: 'POST' | 'GET',
	body?: BodyInit | null | undefined,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params?: unknown & any,
	headers?: HeadersInit
}

export type RequestType = (params: RequesterParams) => Promise<Response>
export function Requester({
	url,
	body,
	headers,
	method,
	params
}: RequesterParams) {
	const searchParams = new URLSearchParams(params)

	const options = {
		method,
		body,
		headers
	}

	const URL = `${url}?${searchParams.toString()}`


	return fetch(URL, options)
}
