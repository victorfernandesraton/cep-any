import { Requester } from "../../requester/index.mjs"
import { CepService } from "../index.mjs"
import { responseToCep } from "./adapters.mjs"

export class ApiCepService extends CepService {
	constructor() {
		super("apicep")
		this.baseUrl = "https://ws.apicep.com/cep.json"
	}
	async handler(cep) {
		const request = await Requester({
			url: this.baseUrl,
			params: {
				code: cep,
			},
		})

		const data = await request.json()

		if (!request.ok) {
			throw new Error(data)
		}

		return responseToCep(data)
	}
}
