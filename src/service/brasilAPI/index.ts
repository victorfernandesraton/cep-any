import axios from "axios";
import { CepService } from "../index";
import { Cep } from "../../entity/cep";
import { responseToCep } from "./adapters";

export class BrasilAPIService extends CepService {
	constructor() {
		super("brasilAPI");
		this.baseUrl = "https://brasilapi.com.br/api/cep/v1/";
	}

	handler = async (cep: string): Promise<Cep> => {
		const requestData = await axios.get(`${this.baseUrl}${cep}`);

		const data = await requestData.data;

		return responseToCep(data);
	};
}
