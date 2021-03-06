import { Cep } from "./entity/cep";
import { CepService } from "./service/index";

export class Provider {
	services: CepService[];
	constructor(services: CepService[]) {
		this.services = services;
	}

	async execute(cep: string): Promise<Cep> {
		try {
			const result = await Promise.any(
				this.services.map((item) => item.execute(cep))
			);
			return result;
		} catch (error) {
			throw new Error("error in execute cep");
		}
	}
}
