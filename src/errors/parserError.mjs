export class ParserError extends Error {
  api = ''

  constructor (api, message) {
    super(message)
    this.api = api
  }
}
