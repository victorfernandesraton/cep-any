// @ts-nocheck
// eslint-disable-next-line no-unused-vars
import { ParamError } from "../errors/paramError.js"
import { Requester } from "../requester/index.js"

export class CepService {
	static api
	baseUrl = ""
	/**
	 *
	 * @param {string} api
	 * @param {
	 * ({
	 * url: string,
	 * method?: "GET"| "POST"| "PUT",
	 * body?: any,
	 * params?: any,
	 * headers?: any
	 * }) => Promise<{
	 * json: () =>Promise<any>
	 * text: () =>Promise<string>
	 * ok: boolean,
	 * status: number
	 *}>
	 * } requester
	 */
	constructor(api, requester = Requester) {
		this.api = api
		this.requester = requester
	}

	generalParse(cep) {
		return cep.replaceAll("-", "")
	}

	validateCep(cep) {
		if (!/[0-9]{8}/.test(cep)) {
			throw new ParamError(cep)
		}
	}

	/**
	 *
	 * @param {string} cep
	 * @returns {Promise<Cep>}
	 */
	async execute(cep) {
		const value = this.generalParse(cep)
		this.validateCep(value)
		const response = await this.handler(cep)
		return response
	}
	/**
	 *
	 * @param {string} cep
	 * @returns {Promise}
	 */
	// eslint-disable-next-line no-unused-vars
	async handler(cep) {
		throw new Error("not implemented")
	}
}
