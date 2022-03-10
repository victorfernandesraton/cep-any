import axios from "axios";
import { Cep } from "../../entity/cep.js";
import { CepService } from "../index.js";
import { responseToCep } from "./adapters.js";

export class ApiCepService extends CepService {
	constructor() {
		super("apicep");
		this.baseUrl = "https://ws.apicep.com/cep.json";
	}
	handler = async (cep: string): Promise<Cep> => {
		const requestData = await axios.get(this.baseUrl, {
			params: {
				code: cep,
			},
		});

		const data = await requestData.data;

		return responseToCep(data);
	};
}
