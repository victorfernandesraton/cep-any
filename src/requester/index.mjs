export class RequestWIthFetch {
  /**
	 * @param {Object} param
	 * @param {string | URL} param.url
	 * @param {BodyInit} [param.body]
	 * @param {Object} [param.headers]
	 * @param {string} [param.method]
	 * @param {Object} [param.params]
	*/
  async execute ({ url, body, headers, method, params }) {
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
