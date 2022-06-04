import { Requester } from "../../requester";
import { CepService } from "../index";
import { Cep } from "../../entity/cep";
import { responseToCep } from "./adapters";

export class ViaCepService extends CepService {
	readonly baseUrl: string;
	constructor() {
		super("viacep");
		this.baseUrl = "https://viacep.com.br";
	}

	async handler(cep: string): Promise<Cep> {
		const request = Requester({
			url: `${this.baseUrl}/ws/${cep}/json`,
			method: "GET",
		});
		const data = await request.json();

		if (request.status !== 200) {
			throw new Error(data);
		}

		return responseToCep(data);
	}
}
