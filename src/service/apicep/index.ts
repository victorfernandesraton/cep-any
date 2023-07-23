import { Request } from '../../requester/index'
import { CepService } from '../index'

export class ApiCepService extends CepService {
	constructor(request: Request) {
		super('apicep', request)
		this.baseUrl = 'https://ws.apicep.com/cep.json'
	}
	async handler(cep: string) {
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
