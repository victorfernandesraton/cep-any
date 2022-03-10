import { Cep } from "../../entity/cep";

export function responseToCep(data: any): Cep {
	return { ...data };
}
