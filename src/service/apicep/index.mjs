import { CepService } from '../index.mjs'

export class ApiCepService extends CepService {
	constructor(request) {
		super('apicep', request, 'https://ws.apicep.com/cep.json')
	}
	/**
	 * @typedef {import('../../types.js').Cep} Cep
	 * @param {string} cep
	 * @returns {Promise<Cep>}
	 */
	async handler(cep) {
		const request = await this.requester.execute({
			url: this.baseUrl,
			params: {
				code: cep,
			},
		})
		const data = await request.json()

		if (!request.ok) {
			throw new Error(data?.message)
		}

		return {
			cep: data.code.split('-').join(''),
			city: data.city,
			state: data.state,
			neighborhood: data.district ?? '',
			street: data.address,
		}
	}
}
