import { CepService } from '../index'

export class ViaCepService extends CepService {
	static baseUrl
	constructor() {
		super('viacep')
		this.baseUrl = 'https://viacep.com.br'
	}

	async handler(cep) {
		const request = await this.requester({
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
