import { CepService } from '../index.mjs'

export class ViaCepService extends CepService {
  /**
	 * @typedef {import('../../requester/index.mjs').RequestWIthFetch} RequestWIthFetch
	 * @param {RequestWIthFetch} requester
	 */
  constructor (requester) {
    super('viacep', requester, 'https://viacep.com.br')
  }

  /**
	 * @typedef {import("../../types.js").Cep} Cep
	 * @param {string} cep
	 * @returns {Promise<Cep>}
	 */
  async handler (cep) {
    const request = await this.requester.execute({
      url: `${this.baseUrl}/ws/${cep}/json`,
      method: 'GET'
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
      neighborhood: data?.bairro ?? ''
    }
  }
}
