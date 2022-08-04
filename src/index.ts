
import { Factory } from "./factory";
import { Provider } from "./provider";
import { CepService } from "./service/index";

function CepAny(cep: string): Promise<Cep> {
	const facotry = Factory({
		useDefaultProviders: true,
	});
	return facotry.execute(cep);
}

export { Factory, Provider, CepAny, CepService };
export default CepAny;
