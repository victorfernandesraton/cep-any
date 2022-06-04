import { Requester } from "../../requester";
import { CepService } from "../index";
import { Cep } from "../../entity/cep";
import { responseToCep } from "./adapters";

export class BrasilAPIService extends CepService {
	constructor() {
		super("brasilAPI");
		this.baseUrl = "https://brasilapi.com.br/api/cep/v1/";
	}

	async handler(cep: string): Promise<Cep> {
		const request = await Requester({ url: `${this.baseUrl}/${cep}` });
		const data = await request.json();

		if (request.status !== 200) {
			throw new Error(data);
		}
		return responseToCep(data);
	}
}
