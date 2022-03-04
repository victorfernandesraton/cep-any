import { AxiosResponse } from "axios";
import { BasicError } from "./basicError.js";

export class RequestError extends BasicError {
	readonly api: string;
	readonly response: AxiosResponse | undefined;
	constructor(
		message: string | undefined,
		api: string,
		request?: AxiosResponse
	) {
		super(message);
		this.api = api;
		this.response = request;
	}
}
