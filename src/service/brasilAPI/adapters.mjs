import { Cep } from "../../entity/index.mjs"

export function responseToCep(data) {
	return Cep.create({...data})
}
