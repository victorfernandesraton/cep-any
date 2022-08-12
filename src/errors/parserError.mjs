export class ParserError extends Error {
	api = ""

	/**
	 * @param {string} api
	 * @param {string?} message
	 */
	constructor(api, message) {
		super(message)
		this.api = api
	}
}
