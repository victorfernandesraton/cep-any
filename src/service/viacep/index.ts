import axios from "axios";
import { CepService } from "../index";
import { Cep } from "../../entity/cep";
import { responseToCep } from "./adapters";
import { RequestError } from "../../errors/requestError";

export class ViaCepService extends CepService {
	readonly baseUrl: string;
	constructor() {
		super("viacep");
		this.baseUrl = "https://viacep.com.br";
	}

	handler = async (cep: string): Promise<Cep> => {
		try {
			const requestData = await axios.get(`${this.baseUrl}/ws/${cep}/json`, {
				method: "GET",
			});

			if (requestData.status != 200) {
				if (requestData.status === 500) {
					throw new RequestError("not found", this.api, requestData);
				} else {
					throw new RequestError("invalid request", this.api, requestData);
				}
			}

			const data = requestData.data;
			const result = responseToCep(data);
			return result;
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
