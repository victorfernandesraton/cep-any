
import { Cep } from '../entity/index'
import { ParamError } from '../errors/paramError'
import { Request } from '../requester/index'

export abstract class CepService {
	protected baseUrl = ''

	constructor(
		private readonly api: string, protected requester: Request) {
		this.api = api
	}

	overrideRequest(requester: Request) {
		this.requester = requester
	}

	static generalParse(cep: string) {
		return cep.replaceAll('-', '').replaceAll('.', '')
	}

	static validateCep(cep: string) {
		return /[0-9]{8}/.test(cep)
	}


	async execute(cep: string | number): Promise<Cep> {
		let data = ''
		if (typeof cep === 'number') {
			data = cep.toString()
		} else {
			data = cep
		}

		const value = CepService.generalParse(data)

		if (!CepService.validateCep(value)) {
			throw new ParamError(value)
		}

		return this.handler(value)
	}

	abstract handler(cep: string): Promise<Cep>
}
