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
		try {
			const requestData = await axios.get(`${this.baseUrl}/ws/${cep}/json`, {
				method: "GET",
			});

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
