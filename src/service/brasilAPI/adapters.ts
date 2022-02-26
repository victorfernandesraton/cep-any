import { Cep } from "../../entity/cep";

export function responseToCep(data: any): Cep {
	return new Cep({ ...data });
}
