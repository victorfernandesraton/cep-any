import { CepService } from '../index.mjs'

export class ApiCepService extends CepService {
	constructor(request) {
		super('apicep', request, 'https://ws.apicep.com/cep.json')
	}
	async handler(cep) {
		const request = await this.requester.execute({
			url: this.baseUrl,
			params: {
				code: cep,
			},
		})

		const data = await request.json()


		if (!request.ok) {
			throw new Error(...data)
		}

		return {
			cep: data.code.replace('-', ''),
			city: data.city,
			state: data.state,
			neighborhood: data.district ?? '',
			street: data.address,
		}
	}
}
