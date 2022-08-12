import { Cep } from "../../entity/index.js"

export function responseToCep(data) {
	return Cep.create({
		cep: data?.cep?.replace("-", "") ?? "",
		state: data?.uf ?? "",
		city: data?.localidade ?? "",
		street: data?.logradouro ?? "",
		neighborhood: data?.bairro ?? "",
	})
}
