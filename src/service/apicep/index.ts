import { Cep } from "../../entity/cep";
import { Requester } from "../../requester";
import { CepService } from "../index";
import { responseToCep } from "./adapters";

export class ApiCepService extends CepService {
	constructor() {
		super("apicep");
		this.baseUrl = "https://ws.apicep.com/cep.json";
	}
	async handler(cep: string): Promise<Cep> {
		const request = await Requester({
			url: this.baseUrl,
			params: {
				code: cep,
			},
		});

		const data = await request.json();

		if (!request.ok) {
			throw new Error(data);
		}

		return responseToCep(data);
	}
}
