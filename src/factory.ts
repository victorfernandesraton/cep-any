import { Provider } from "./provider";
import { CepService } from "./service/index";
import { ApiCepService } from "./service/apicep/index";
import { BrasilAPIService } from "./service/brasilAPI/index";
import { CorreiosService } from "./service/correios/index";
import { ViaCepService } from "./service/viacep/index";

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
