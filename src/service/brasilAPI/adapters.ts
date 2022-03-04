import { Cep } from "../../entity/cep.js";

export function responseToCep(data: any): Cep {
	return { ...data };
}
