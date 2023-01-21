export interface Request {
	execute(params :RequesterParams): Promise<Response>
}

export type RequesterParams = {
	url: string,
	method?: 'POST' | 'GET',
	body?: BodyInit | null | undefined,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params?: unknown & any,
	headers?: HeadersInit
}

export class RequestWIthFetch {
	async execute({url, body, headers,  method, params} :RequesterParams): Promise<Response> {
		const searchParams = new URLSearchParams(params)

		const options = {
			method,
			body,
			headers
		}

		const URL = `${url}?${searchParams.toString()}`


		return fetch(URL, options)
	}
}