import { Provider } from "./provider.js";
import { CepService } from "./service/index.js";
import { ApiCepService } from "./service/apicep/index.js";
import { BrasilAPIService } from "./service/brasilAPI/index.js";
import { CorreiosService } from "./service/correios/index.js";
import { ViaCepService } from "./service/viacep/index.js";

interface FactoryOptions {
	useDefaultProviders?: boolean;
	custonProviders?: CepService[];
}

export function Factory({
	useDefaultProviders = true,
	custonProviders,
}: FactoryOptions): Provider {
	let services: CepService[] = [];
	if (useDefaultProviders) {
		services = [
			new ViaCepService(),
			new BrasilAPIService(),
			new ApiCepService(),
			new CorreiosService(),
		];
	}
	if (custonProviders?.length) {
		services = [...services, ...custonProviders];
	}

	return new Provider(services);
}
