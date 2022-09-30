export class ParserError extends Error {
	api = ''

	/**
	 * @param {string} api
	 * @param {string?} message
	 */
	constructor(api, message) {
		if (message) {
			super(message)
		} else {
			super()
		}
		this.api = api
	}
}
