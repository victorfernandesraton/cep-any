import { CepService } from './service/index.mjs'


export const service = CepService
import { cep } from './cep.mjs'
import factory from './factory.mjs'
import { Provider } from './provider.mjs'
import { RequestWIthFetch } from './requester/index.mjs'

export {
	cep,
	CepService,
	Provider,
	factory,
	RequestWIthFetch,
}