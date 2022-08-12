// eslint-disable-next-line no-unused-vars
import { CepService } from "./service/index.js"

export class Provider {
	services
	/**
	 *
	 * @param {CepService[]} services
	 */
	constructor(services) {
		this.services = services
	}

	async execute(cep) {
		try {
			const result = await Promise.any(
				this.services.map((item) => item.execute(cep))
			)
			return result
		} catch (error) {
			throw new Error("error in execute cep")
		}
	}
}
