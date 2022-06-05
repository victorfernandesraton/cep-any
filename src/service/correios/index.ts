import { Requester } from "../../requester";
import { CepService } from "../index";
import { Cep } from "../../entity/cep";
import { parseParamsToXML, responseToCep } from "./adapters";

export class CorreiosService extends CepService {
	constructor() {
		super("correios");
		this.baseUrl = "https://apps.correios.com.br";
	}

	async handler(cep: string): Promise<Cep> {
		const request = await Requester({
			url: `${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,
			body: parseParamsToXML(cep),
			method: "POST",
			headers: {
				"Content-Type": "application/xml",
			},
		});
		const data = await request.text();

		if (!request.ok) {
			throw new Error(data);
		}

		return responseToCep(data);
	}
}
