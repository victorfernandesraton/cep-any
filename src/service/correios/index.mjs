import { CepService } from '../index.mjs'
import { parseParamsToXML, responseToCep } from './adapters.mjs'

export class CorreiosService extends CepService {
	constructor(requester) {
		super('correios', requester,'https://apps.correios.com.br')
	}

	async handler(cep) {
		const request = await this.requester.execute({
			url: `${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,
			body: parseParamsToXML(cep),
			method: 'POST',
			headers: {
				'Content-Type': 'application/xml',
			},
		})
		const data = await request.text()

		if (!request.ok) {
			throw new Error(data)
		}

		return responseToCep(data)
	}
}