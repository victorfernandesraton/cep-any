import factory from './factory.mjs'

/**
 * @typedef {import("./types.js").Cep} Cep
 * @param {string | number} cep 
 * @returns {Promise<Cep>} 
 */
export const cep = (cep) => {
	const handler = factory({
		useDefaultProviders: true,
	})
	return handler.execute(cep)
}
