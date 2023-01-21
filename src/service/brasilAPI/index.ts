import { Request } from '../../requester/index'
import { CepService } from '../index'

export class BrasilAPIService extends CepService {
	constructor(request: Request) {
		super('brasilAPI', request)
		this.baseUrl = 'https://brasilapi.com.br/api/cep/v1'
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
