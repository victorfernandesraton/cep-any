/**
 * @typedef {import('./types.ts').Cep} Cep
 * @typedef {import('./service/index.mjs').CepService} CepService
 */

export class Provider {
  #services

  /**
   * @param {CepService[]} services
  */
  constructor (services) {
    this.#services = services
  }

  /**
  * @param {string | number} zipcode
  * @returns {Promise<Cep>}
  */
  async execute (zipcode) {
    const result = await Promise.any(
      this.#services.map((item) => item.execute(zipcode))
    )
    return result
  }
}
