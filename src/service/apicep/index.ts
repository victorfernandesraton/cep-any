import { Requester } from '../../requester/'
import { CepService } from '../index'

export class ApiCepService extends CepService {
	constructor() {
		super('apicep')
		this.baseUrl = 'https://ws.apicep.com/cep.json'
	}
	async handler(cep) {
		const request = await Requester({
			url: this.baseUrl,
			params: {
				code: cep,
			},
		})

		const data = await request.json()


		if (!request.ok) {
			throw new Error(data)
		}

		return {
			cep: data.code.replaceAll('-', ''),
			city: data.city,
			state: data.state,
			neighborhood: data.district ?? '',
			street: data.address,
		}
	}
}
