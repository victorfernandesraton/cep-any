import { Cep } from "./entity/cep";
import { Factory } from "./factory";

export default function (cep: string): Promise<Cep> {
	const facotry = Factory({
		useDefaultProviders: true,
	});
	return facotry.execute(cep);
}
