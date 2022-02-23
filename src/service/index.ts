import { Cep } from "entity/cep";

export abstract class CepService {
  readonly api: string;
  constructor(api: string) {
    this.api = api;
  }

  abstract execute(cep: string): Promise<Cep>;
}
