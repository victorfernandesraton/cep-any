import { Cep } from "../../entity/cep";

export interface CepResponse {
	cep?: string;
	uf?: string;
	localidade?: string;
	logradouro?: string;
	bairro?: string;
}
export function responseToCep(data: CepResponse): Cep {
	return new Cep({
		cep: data?.cep?.replace("-", ""),
		state: data?.uf,
		city: data?.localidade,
		street: data?.logradouro,
		neighborhood: data?.bairro,
	});
}
