/**
 * @typedef {import('./types.js').Cep} Cep
 */


export class Provider {
	#services

	constructor(services) {
		this.#services = services
	}


	/**
	 * @returns {Promise<Cep>}
	 */
	async execute(zipcode) {
		const result = await Promise.any(
			this.#services.map((item) => item.execute(zipcode))
		)
		return result
	}
}
