export class ParserError extends Error {
	api = ''

	constructor(api, message) {
		if (message) {
			super(message)
		} else {
			super()
		}
		this.api = api
	}
}
