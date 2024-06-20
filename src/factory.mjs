import { Provider } from './provider.mjs'
import { RequestWIthFetch } from './requester/index.mjs'
import { BrasilAPIService } from './service/brasilAPI/index.mjs'
import { ViaCepService } from './service/viacep/index.mjs'

/**
 *
 * @typedef {import('./service/index.mjs').CepService} CepService
 * @typedef {Object} Params
 * @property {boolean} [useDefaultProviders]
 * @property {Array<CepService>} [custonProviders]
 * @property {any} [requester]
 *
 * @returns {Provider}
 */
export default function ({
  useDefaultProviders = true,
  custonProviders = [],
  requester = new RequestWIthFetch()
}) {
  let services = []
  if (useDefaultProviders) {
    services = [
      new ViaCepService(requester),
      new BrasilAPIService(requester)
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
