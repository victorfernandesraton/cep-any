import { Request } from '../../requester/index'
import { CepService } from '../index'

export class ViaCepService extends CepService {
	static baseUrl
	constructor(requester: Request) {
		super('viacep', requester)
		this.baseUrl = 'https://viacep.com.br'
	}

	async handler(cep) {
		const request = await this.requester.execute({
			url: `${this.baseUrl}/ws/${cep}/json`,
			method: 'GET',
		})
		const data = await request.json()

		if (!request.ok) {
			throw new Error(data)
		}

		return {
			cep: data?.cep?.replace('-', '') ?? '',
			state: data?.uf ?? '',
			city: data?.localidade ?? '',
			street: data?.logradouro ?? '',
			neighborhood: data?.bairro ?? '',
		}
	}
}
