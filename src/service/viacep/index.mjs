import { Requester } from "../../requester/index.mjs"
import { CepService } from "../index.mjs"
import { responseToCep } from "./adapters.mjs"

export class ViaCepService extends CepService {
	static baseUrl
	constructor() {
		super("viacep")
		this.baseUrl = "https://viacep.com.br"
	}

	async handler(cep) {
		const request = await Requester({
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
