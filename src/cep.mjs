import factory from './factory.mjs'
export const cep = (cep) => {
	const handler = factory({
		useDefaultProviders: true,
	})
	return handler.execute(cep)
}
