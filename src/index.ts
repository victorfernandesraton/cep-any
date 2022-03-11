import { Cep } from "./entity/cep";
import { Factory } from "./factory";
import { Provider } from "./provider";
import { CepService } from "./service";

const cep = (cep: string): Promise<Cep> => {
	const facotry = Factory({
		useDefaultProviders: true,
	});
	return facotry.execute(cep);
};

export { Factory, Provider, cep, CepService };
