import { Requester } from "../../requester/index";
import { CepService } from "../index";
import { responseToCep } from "./adapters";

export class ViaCepService extends CepService {
	readonly baseUrl: string;
	constructor() {
		super("viacep");
		this.baseUrl = "https://viacep.com.br";
	}

	async handler(cep: string): Promise<Cep> {
		const request = await Requester({
			url: `${this.baseUrl}/ws/${cep}/json`,
			method: "GET",
		});
		const data = await request.json();

		if (!request.ok) {
			throw new Error(data);
		}

		return responseToCep(data);
	}
}
