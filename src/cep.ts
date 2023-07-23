import { Cep } from './entity/'
import factory from './factory'
export const cep = (cep: string): Promise<Cep> => {
	const handler = factory({
		useDefaultProviders: true,
	})
	return handler.execute(cep)
}
