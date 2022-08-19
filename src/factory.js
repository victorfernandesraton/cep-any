import { Provider } from "./provider.js"
import { Requester } from "./requester/index.js"
import { ApiCepService } from "./service/apicep/index.js"
import { BrasilAPIService } from "./service/brasilAPI/index.js"
import { CorreiosService } from "./service/correios/index.js"
import { ViaCepService } from "./service/viacep/index.js"


/**
 *
 * @param {{
 * useDefaultProviders?: boolean,
 * custonProviders?: CepService,
 * requester?: Requester
 * }} param0
 * @returns
 */
export default function ({
	useDefaultProviders = true,
	custonProviders,
	requester = Requester
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
	if (requester) {
		services = [...services.map(service => {
			service.requester = requester
			return service
		})
		]
	}

	return new Provider(services)
}
