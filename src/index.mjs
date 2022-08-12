
// eslint-disable-next-line no-unused-vars
import { Cep } from "./entity/index.mjs"
import { Factory } from "./factory.mjs"
import { Provider } from "./provider.mjs"
import { CepService } from "./service/index.mjs"

/**
 *
 * @param {string} cep
 * @returns {Cep}
 */
function CepAny(cep) {
	const facotry = Factory({
		useDefaultProviders: true,
	})
	return facotry.execute(cep)
}

export { Factory, Provider, CepAny, CepService }
export default CepAny
