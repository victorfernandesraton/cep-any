import { BasicError } from './basicError.mjs'

export class ParamError extends BasicError {
	constructor(args) {
		super(`invalid params ${args}`)
	}
}
