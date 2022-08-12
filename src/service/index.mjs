import { ParamError } from "../errors/paramError.mjs";

export class CepService {
	static api;
	baseUrl = "";
	constructor(api) {
		this.api = api;
	}

	generalParse(cep) {
		return cep.replaceAll("-", "");
	}

	validateCep(cep) {
		if (!/[0-9]{8}/.test(cep)) {
			throw new ParamError(cep);
		}
	}

	async execute(cep) {
		const value = this.generalParse(cep);
		this.validateCep(value);
		const response = await this.handler(cep);
		return response;
	}
	async handler(cep) {
		throw new Error("not implemented");
	}
}
