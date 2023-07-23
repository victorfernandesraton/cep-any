import { Provider } from './provider.mjs'
import { RequestWIthFetch } from './requester/index.mjs'
import { ApiCepService } from './service/apicep/index.mjs'
import { BrasilAPIService } from './service/brasilAPI/index.mjs'
import { CorreiosService } from './service/correios/index.mjs'
import { ViaCepService } from './service/viacep/index.mjs'


/**
 * 
 * @typedef {Object} Params
 * @property {boolean} [useDefaultProviders]
 * @property {Array} [custonProviders]
 * @property {any} [requester]
 *  
 * @returns {Provider} 
 */
export default function ({
	useDefaultProviders = true,
	custonProviders = [],
	requester = new RequestWIthFetch(),
}) {
	let services = []
	if (useDefaultProviders) {
		services = [
			new ViaCepService(requester),
			new BrasilAPIService(requester),
			new ApiCepService(requester),
			new CorreiosService(requester),
		]
	}
	if (custonProviders?.length) {
		services = [...services, ...custonProviders]
	}
	if (requester) {
		services = [...services.map(service => {
			service.overrideRequest(requester)
			return service
		})
		]
	}

	return new Provider(services)
}
