import axios from "axios";
import { CepService } from "../index.js";
import { Cep } from "../../entity/cep.js";
import { parseParamsToXML, responseToCep } from "./adapters.js";

export class CorreiosService extends CepService {
	constructor() {
		super("correios");
		this.baseUrl = "https://apps.correios.com.br";
	}

	handler = async (cep: string): Promise<Cep> => {
		const requestData = await axios.post(
			`${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,
			parseParamsToXML(cep),
			{
				headers: {
					"Content-Type": "application/xml",
				},
			}
		);

		const data = await requestData.data;

		return responseToCep(data);
	};
}
