import { Cep } from "../../entity/cep.js";

export interface CepResponse {
	cep?: string;
	uf?: string;
	localidade?: string;
	logradouro?: string;
	bairro?: string;
}
export function responseToCep(data: CepResponse): Cep {
	return {
		cep: data?.cep?.replace("-", "") ?? "",
		state: data?.uf ?? "",
		city: data?.localidade ?? "",
		street: data?.logradouro ?? "",
		neighborhood: data?.bairro ?? "",
	};
}
