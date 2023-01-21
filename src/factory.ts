import { Provider } from './provider'
import { Request, RequestWIthFetch } from './requester/index'
import { ApiCepService } from './service/apicep/index'
import { BrasilAPIService } from './service/brasilAPI/index'
import { CorreiosService } from './service/correios/index'
import { CepService } from './service/index'
import { ViaCepService } from './service/viacep/index'

type Params = {
	useDefaultProviders?: boolean,
	custonProviders?: CepService[],
	requester?: Request
}
export default function ({
	useDefaultProviders = true,
	custonProviders,
	requester = new RequestWIthFetch(),
}: Params) {
	let services: CepService[] = []
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
