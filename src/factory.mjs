import { Provider } from "./provider.mjs"
import { ApiCepService } from "./service/apicep/index.mjs"
import { BrasilAPIService } from "./service/brasilAPI/index.mjs"
import { CorreiosService } from "./service/correios/index.mjs"
import { ViaCepService } from "./service/viacep/index.mjs"


export function Factory({
	useDefaultProviders = true,
	custonProviders,
}) {
	let services = []
	if (useDefaultProviders) {
		services = [
			new ViaCepService(),
			new BrasilAPIService(),
			new ApiCepService(),
			new CorreiosService(),
		]
	}
	if (custonProviders?.length) {
		services = [...services, ...custonProviders]
	}

	return new Provider(services)
}
