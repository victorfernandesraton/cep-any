import { Cep } from "../../entity/cep.js";

interface CepResponse {
	code: string;
	state: string;
	city: string;
	district?: string;
	address: string;
}
export function responseToCep(data: CepResponse): Cep {
	return {
		cep: data.code.replaceAll("-", ""),
		city: data.city,
		state: data.state,
		neighborhood: data.district ?? "",
		street: data.address,
	};
}
