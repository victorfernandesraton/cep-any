import { CepService } from "../index.js"
import { responseToCep } from "./adapters.js"

export class ViaCepService extends CepService {
	static baseUrl
	constructor() {
		super("viacep")
		this.baseUrl = "https://viacep.com.br"
	}

	async handler(cep) {
		const request = await this.requester({
			url: `${this.baseUrl}/ws/${cep}/json`,
			method: "GET",
		})
		const data = await request.json()

		if (!request.ok) {
			throw new Error(data)
		}

		return responseToCep(data)
	}
}
