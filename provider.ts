import { CepService } from "./service.ts";
export class Provider {
  constructor(readonly services: CepService[]) {
  }

  async execute(zipcode: string | number) {
    const result = await Promise.any(
      this.services.map((item) => item.execute(zipcode)),
    );
    return result;
  }
}
