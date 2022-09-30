import factory from './factory'

export const cep = (cep: string) => {
	const handler = factory({
		useDefaultProviders: true,
	})
	return handler.execute(cep)
}