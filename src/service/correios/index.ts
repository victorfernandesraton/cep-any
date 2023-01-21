import { Request } from '../../requester/index'
import { CepService } from '../index'
import { parseParamsToXML, responseToCep } from './adapters'

export class CorreiosService extends CepService {
	constructor(requester: Request) {
		super('correios', requester)
		this.baseUrl = 'https://apps.correios.com.br'
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
