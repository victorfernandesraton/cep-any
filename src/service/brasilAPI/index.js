import { Requester } from "../../requester/index.js"
import { CepService } from "../index.js"
import { responseToCep } from "./adapters.js"

export class BrasilAPIService extends CepService {
	constructor() {
		super("brasilAPI")
		this.baseUrl = "https://brasilapi.com.br/api/cep/v1/"
	}

	async handler(cep) {
		const request = await Requester({ url: `${this.baseUrl}/${cep}` })
		const data = await request.json()

		if (!request.ok) {
			throw new Error(data)
		}
		return responseToCep(data)
	}
}
