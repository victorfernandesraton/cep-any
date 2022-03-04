import axios from "axios";
import { CepService } from "../index.js";
import { Cep } from "../../entity/cep.js";
import { RequestError } from "../../errors/requestError.js";
import { responseToCep } from "./adapters.js";

export class BrasilAPIService extends CepService {
	constructor() {
		super("brasilAPI");
		this.baseUrl = "https://brasilapi.com.br/api/cep/v1/";
	}

	handler = async (cep: string): Promise<Cep> => {
		try {
			const requestData = await axios.get(`${this.baseUrl}${cep}`);
			if (requestData.status != 200) {
				if (requestData.status >= 400 && requestData.status <= 499) {
					throw new RequestError("not found", this.api, requestData);
				} else {
					throw new RequestError("invalid request", this.api, requestData);
				}
			}

			const data = await requestData.data;

			return responseToCep(data);
		} catch (error) {
			if (typeof error == "string") {
				throw new Error(error);
			} else {
				if (
					error instanceof Error &&
					error?.message == "Request failed with status code 404"
				) {
					throw new RequestError("not found", this.api);
				} else {
					throw error;
				}
			}
		}
	};
}
