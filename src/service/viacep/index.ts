import axios from "axios";
import { CepService } from "../index.js";
import { Cep } from "../../entity/cep.js";
import { responseToCep } from "./adapters.js";
import { RequestError } from "../../errors/requestError.js";

export class ViaCepService extends CepService {
	readonly baseUrl: string;
	constructor() {
		super("viacep");
		this.baseUrl = "https://viacep.com.br";
	}

	handler = async (cep: string): Promise<Cep> => {
		const requestData = await axios.get(`${this.baseUrl}/ws/${cep}/json`, {
			method: "GET",
		});

		if (requestData.status != 200) {
			throw new RequestError("not valid request", this.api);
		}
		const data = requestData.data;

		const result = responseToCep(data);
		return result;
	};
}
