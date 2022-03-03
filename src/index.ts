import { Cep } from "./entity/cep";
import { Factory } from "./factory";

function cep(cep: string): Promise<Cep> {
	const facotry = Factory({
		useDefaultProviders: true,
	});
	return facotry.execute(cep);
}
export default cep;
