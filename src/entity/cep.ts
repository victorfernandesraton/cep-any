interface CepParams {
	cep?: string;
	street?: string;
	city?: string;
	state?: string;
	neighborhood?: string;
}

export class Cep {
	readonly cep: string;
	readonly street: string;
	readonly city: string;
	readonly state: string;
	readonly neighborhood: string;
	constructor({ cep, street, city, state, neighborhood }: CepParams) {
		if (cep) {
			this.cep = cep;
		} else {
			this.cep = "";
		}

		if (street) {
			this.street = street;
		} else {
			this.street = "";
		}
		if (state) {
			this.state = state;
		} else {
			this.state = "";
		}
		if (city) {
			this.city = city;
		} else {
			this.city = "";
		}
		if (neighborhood) {
			this.neighborhood = neighborhood;
		} else {
			this.neighborhood = "";
		}
	}
}
