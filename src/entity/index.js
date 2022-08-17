export class Cep {
	/**
	 * @param {{
	 * cep: string,
	 * street: string,
	 * state: string,
	 * neighborhood: string
	 * city: string
	 * }} param0
	 */
	constructor({
		cep,
		street,
		city,
		state,
		neighborhood,
	}) {
		this.cep = cep
		this.street = street
		this.city = city
		this.state = state
		this.neighborhood = neighborhood
	}
	/**
	 * @param {{
	 * cep: string,
	 * street: string,
	 * state: string,
	 * neighborhood: string
	 * }} param0
	 * @returns {Cep}
	 */
	static create({
		cep,
		street,
		city,
		state,
		neighborhood,
	}) {
		return new Cep({
			cep,
			street,
			city,
			state,
			neighborhood,
		})
	}
}
