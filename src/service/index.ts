
import { Cep } from '../entity/index'
import { ParamError } from '../errors/paramError'
import { Requester, RequestType } from '../requester/index'

export abstract class CepService {
	private readonly api: string
	protected requester
	protected baseUrl = ''

	constructor(api: string, requester = Requester) {
		this.api = api
		this.requester = requester
	}

	overrideRequest(requester: RequestType) {
		this.requester = requester
	}

	generalParse(cep: string) {
		return cep.replaceAll('-', '')
	}

	validateCep(cep: string) {
		if (!/[0-9]{8}/.test(cep)) {
			throw new ParamError(cep)
		}
	}


	async execute(cep: string) {
		const value = this.generalParse(cep)
		this.validateCep(value)
		const response = await this.handler(cep)
		return response
	}

	abstract handler(cep: string): Promise<Cep>
}
