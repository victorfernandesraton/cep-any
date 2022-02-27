import axios from "axios";
import { CepService } from "../index";
import { Cep } from "../../entity/cep";
import { RequestError } from "../../errors/requestError";
import { parseParamsToXML, responseToCep } from "./adapters";

export class CorreiosService extends CepService {
	constructor() {
		super("correios");
		this.baseUrl = "https://apps.correios.com.br";
	}

	handler = async (cep: string): Promise<Cep> => {
		try {
			const requestData = await axios.post(
				`${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,
				parseParamsToXML(cep),
				{
					headers: {
						"Content-Type": "application/xml",
					},
				}
			);

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
