import { Cep } from "../../entity/index.js"

export function responseToCep(data) {
	return Cep.create({...data})
}
