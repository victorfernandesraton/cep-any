import { BasicError } from "./basicError.js";

export class ParamError extends BasicError {
	constructor(args: string) {
		super(`invalid params ${args}`);
	}
}
