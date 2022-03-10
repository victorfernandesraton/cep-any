import axios from "axios";
import { CepService } from "../index";
import { Cep } from "../../entity/cep";
import { responseToCep } from "./adapters";

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

		const data = requestData.data;

		return responseToCep(data);
	};
}
