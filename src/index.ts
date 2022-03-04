import { Cep } from "./entity/cep.js";
import { Factory } from "./factory.js";

export function cep(cep: string): Promise<Cep> {
	const facotry = Factory({
		useDefaultProviders: true,
	});
	return facotry.execute(cep);
}
