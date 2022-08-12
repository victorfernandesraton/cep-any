import { Cep } from "../../entity/index.mjs";

/**
 *
 * @param {{
 * code: string;
 * state: string;
 * city: string;
 * district?: string;
 * address: string;
* }} data
 * @returns {Cep}
 */
export function responseToCep(data) {
	return Cep.create({
		cep: data.code.replaceAll("-", ""),
		city: data.city,
		state: data.state,
		neighborhood: data.district ?? "",
		street: data.address,
	});
}
