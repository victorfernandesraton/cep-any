export class RequestWIthFetch {
	async execute({url, body, headers,  method, params}) {
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