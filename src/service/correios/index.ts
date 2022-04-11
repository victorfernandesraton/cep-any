import axios from "axios";
import { CepService } from "../index";
import { Cep } from "../../entity/cep";
import { parseParamsToXML, responseToCep } from "./adapters";

export class CorreiosService extends CepService {
	constructor() {
		super("correios");
		this.baseUrl = "https://apps.correios.com.br";
	}

	async handler(cep: string): Promise<Cep> {
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
	}
}
