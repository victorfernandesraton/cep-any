
import { ParamError } from '../errors/paramError.mjs'

export class CepService {
	constructor(api, requester, baseUrl = '') {
		this.api = api
		this.requester = requester
		this.baseUrl = baseUrl
	}

	overrideRequest(requester) {
		this.requester = requester
	}

	static generalParse(cep) {
		return cep.split('-').join('').split('.').join('')
	}

	static validateCep(cep) {
		return /[0-9]{8}/.test(cep)
	}


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
	handler(_cep) {
		throw new Error('Not implemented')
	}

}
