type RequesterParams = {
	url: string,
	method?: "GET"| "POST"| "PUT",
	body?: any,
	params?: any,
	headers?: any
}

type RequesterResponse = {
	json: () =>Promise<any>
	text: () =>Promise<string>
	ok: boolean,
	status: number
}


export function Requester({
	url,
	method = "GET",
	body,
	params,
	headers,
}: RequesterParams) : Promise<RequesterResponse> {
	const searchParams = new URLSearchParams();
	const options = {
		method,
		body,
		headers
	};
	if (params) {
		for (const key in params) {
			searchParams.set(key, params[key]);
		}
	}

	const URL = `${url}?${searchParams.toString()}`;

	return global.fetch(URL, options);
}
