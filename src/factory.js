import { Provider } from "./provider.js"
import { ApiCepService } from "./service/apicep/index.js"
import { BrasilAPIService } from "./service/brasilAPI/index.js"
import { CorreiosService } from "./service/correios/index.js"
import { ViaCepService } from "./service/viacep/index.js"


export default function ({
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
