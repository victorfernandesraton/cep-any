import { CepService } from "service/";
import { Cep } from "./entity/cep";

export class Provider {
  services: CepService[];
  constructor(services: CepService[]) {
    this.services = services;
  }

  execute = async (cep: string): Promise<Cep> => {
    try {
      const result = await Promise.any(
        this.services.map((item) => item.execute(cep))
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("error in execute cep");
    }
  };
}
