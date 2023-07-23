
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
	 * @param {string} zipcode
	 */
	static generalParse(zipcode) {
		return zipcode.split('-').join('').split('.').join('')
	}

	/**
	 * @param {string} zipcode
	 * @returns {boolean}
	 */
	static validateCep(zipcode) {
		return /[0-9]{8}/.test(zipcode)
	}


	/**
	 * @param {string | number} zipcode
	 * @returns {Promise<Cep>}
	 */
	async execute(zipcode) {
		let data = ''
		if (typeof zipcode === 'number') {
			data = zipcode.toString()
		} else {
			data = zipcode
		}

		const value = CepService.generalParse(data)

		if (!CepService.validateCep(value)) {
			throw new ParamError(value)
		}

		return this.handler(value)
	}
	/**
	 * @param {string | number} _zipcode
	 * @returns {Promise<Cep>}
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handler(_zipcode) {
		throw new Error('Not implemented')
	}

}
