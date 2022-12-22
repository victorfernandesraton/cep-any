export class ParserError extends Error {
	private readonly api: string

	constructor(api: string, message: string) {
		if (message) {
			super(message)
		} else {
			super()
		}
		this.api = api
	}
}
