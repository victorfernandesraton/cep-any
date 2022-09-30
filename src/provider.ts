import { Cep } from './entity/index'
import { CepService } from './service/index'

export class Provider {
	private readonly services

	constructor(services: CepService[]) {
		this.services = services
	}


	async execute(cep: string): Promise<Cep> {
		const result = await Promise.any(
			this.services.map((item) => item.execute(cep))
		)
		return result
	}
}
