import { CepService } from '../index.mjs'

export class BrasilAPIService extends CepService {
	constructor(request) {
		super('brasilAPI', request, 'https://brasilapi.com.br/api/cep/v1')
	}

	async handler(cep) {
		const request = await this.requester.execute({ url: `${this.baseUrl}/${cep}` })
		const data = await request.json()

		if (!request.ok) {
			throw new Error(data)
		}
		return {
			...data
		}
	}
}