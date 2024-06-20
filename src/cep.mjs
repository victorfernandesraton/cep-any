import factory from './factory.mjs'

/**
 * @typedef {import("./types.ts").Cep} Cep
 * @param {string | number} zipcode
 * @returns {Promise<Cep>}
 */
export const cep = (zipcode) => {
  const handler = factory({
    useDefaultProviders: true
  })
  return handler.execute(zipcode)
}
