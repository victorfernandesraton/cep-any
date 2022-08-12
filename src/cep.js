// eslint-disable-next-line no-unused-vars
import { Cep } from "./entity/index.js"
import factory from "./factory.js"

/**
 *
 * @param {string} cep
 * @returns {Promise<Cep>}
 */
export const cep = (cep) => {
	const handler = factory({
		useDefaultProviders: true,
	})
	return handler.execute(cep)
}