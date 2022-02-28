import { Provider } from "./provider";
import { CepService } from "./service";
import { ApiCepService } from "./service/apicep";
import { BrasilAPIService } from "./service/brasilAPI";
import { CorreiosService } from "./service/correios";
import { ViaCepService } from "./service/viacep";

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
