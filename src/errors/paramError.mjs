import { BasicError } from "./basicError";

export class ParamError extends BasicError {
	constructor(args) {
		super(`invalid params ${args}`);
	}
}
