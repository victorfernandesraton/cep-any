import type { Cep } from "../cep.ts";
import { CepService } from "../service.ts";

export class BrasilAPIService extends CepService {
  constructor(request: typeof fetch) {
    super("brasilAPI", request, "https://brasilapi.com.br/api/cep/v1");
  }

  async handler(cep: string | number): Promise<Cep> {
    const request = await this.requester(
      `${this.baseUrl}/${cep}`,
    );
    const data = await request.json();

    if (!request.ok) {
      throw new Error(data);
    }
    return {
      ...data,
    };
  }
}
