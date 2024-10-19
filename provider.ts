import type { Cep } from "./cep.ts";
import type { CepService } from "./service.ts";
export class Provider {
  constructor(readonly services: CepService[]) {
  }

  async execute(zipcode: string | number): Promise<Cep> {
    const result = await Promise.any(
      this.services.map((item) => item.execute(zipcode)),
    );
    return result;
  }
}
