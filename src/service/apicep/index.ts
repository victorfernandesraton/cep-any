import axios from "axios";
import { Cep } from "../../entity/cep";
import { RequestError } from "../../errors/requestError";
import { CepService } from "../index";
import { responseToCep } from "./adapters";

export class ApiCepService extends CepService {
	constructor() {
		super("apicep");
		this.baseUrl = "https://ws.apicep.com/cep.json";
	}
	handler = async (cep: string): Promise<Cep> => {
		try {
			const requestData = await axios.get(this.baseUrl, {
				params: {
					code: cep,
				},
			});

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
					throw new RequestError("unknow error", this.api);
				}
			}
		}
	};
}
