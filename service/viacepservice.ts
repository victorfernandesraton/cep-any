import type { Cep } from "../cep.ts";
import { CepService } from "../service.ts";

export class ViaCepService extends CepService {
  constructor(requester: typeof fetch) {
    super("viacep", requester, "https://viacep.com.br");
  }

  async handler(cep: string | number): Promise<Cep> {
    const request = await this.requester(`${this.baseUrl}/ws/${cep}/json`, {
      method: "GET",
    });
    const data = await request.json();

    if (!request.ok) {
      throw new Error(data);
    }

    return {
      cep: data?.cep?.replace("-", "") ?? "",
      state: data?.uf ?? "",
      city: data?.localidade ?? "",
      street: data?.logradouro ?? "",
      neighborhood: data?.bairro ?? "",
    };
  }
}
