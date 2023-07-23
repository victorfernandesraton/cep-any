
/**
 * @typedef {import('../types.js').Cep} Cep
 */

import { ParamError } from '../errors/paramError.mjs'
export class CepService {
	/**
	 * @param {any} api
	 * @param {any} requester
	 */
	constructor(api, requester, baseUrl = '') {
		this.api = api
		this.requester = requester
		this.baseUrl = baseUrl
	}

	/**
	 * @param {any} requester
	 */
	overrideRequest(requester) {
		this.requester = requester
	}

	/**
	 * @param {string} cep
	 */
	static generalParse(cep) {
		return cep.split('-').join('').split('.').join('')
	}

	/**
	 * @param {string} cep
	 * @returns {boolean}
	 */
	static validateCep(cep) {
		return /[0-9]{8}/.test(cep)
	}


	/**
	 * @param {string | number} cep
	 * @returns {Promise<Cep>}
	 */
	async execute(cep) {
		let data = ''
		if (typeof cep === 'number') {
			data = cep.toString()
		} else {
			data = cep
		}

		const value = CepService.generalParse(data)

		if (!CepService.validateCep(value)) {
			throw new ParamError(value)
		}

		return this.handler(value)
	}
	/**
	 * @param {string | number} _cep
	 * @returns {Promise<Cep>}
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handler(_cep) {
		throw new Error('Not implemented')
	}

}
