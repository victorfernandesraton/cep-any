import { Provider } from './provider'
import { Requester, RequestType } from './requester/index'
import { ApiCepService } from './service/apicep/index'
import { BrasilAPIService } from './service/brasilAPI/index'
import { CorreiosService } from './service/correios/index'
import { CepService } from './service/index'
import { ViaCepService } from './service/viacep/index'

type Params = {
	useDefaultProviders?: boolean,
	custonProviders?: CepService[],
	requester?: RequestType
}
export default function ({
	useDefaultProviders = true,
	custonProviders,
	requester = Requester
}: Params) {
	let services: CepService[] = []
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
			service.overrideRequest(requester)
			return service
		})
		]
	}

	return new Provider(services)
}
