import { CepService } from '../index.mjs'

export class BrasilAPIService extends CepService {
  /**
  * @typedef {import('../../requester/index.mjs').RequestWIthFetch} RequestWIthFetch
  * @param {RequestWIthFetch} request
  */
  constructor (request) {
    super('brasilAPI', request, 'https://brasilapi.com.br/api/cep/v1')
  }

  /**
  * @typedef {import('../../types.ts').Cep} Cep
  * @param {string} cep
  * @returns {Promise<Cep>}
  */
  async handler (cep) {
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
