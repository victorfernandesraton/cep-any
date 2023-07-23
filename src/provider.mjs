
export class Provider {
	#services

	constructor(services) {
		this.#services = services
	}


	async execute(cep) {
		const result = await Promise.any(
			this.#services.map((item) => item.execute(cep))
		)
		return result
	}
}
