import { Cep } from "../../entity/index.mjs"

export function responseToCep(data) {
	return Cep.create({
		cep: data?.cep?.replace("-", "") ?? "",
		state: data?.uf ?? "",
		city: data?.localidade ?? "",
		street: data?.logradouro ?? "",
		neighborhood: data?.bairro ?? "",
	})
}
