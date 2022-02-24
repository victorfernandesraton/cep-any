import { Cep } from "../entity/cep";
import { BasicError } from "../errors/basicError";
import { ParamError } from "../errors/paramError";

export abstract class CepService {
  readonly api: string;
  constructor(api: string) {
    this.api = api;
  }

  generalParse(cep: string): string {
    return cep.replaceAll("-", "");
  }

  validateCep(cep: string) {
    if (!/[0-9]{8}/.test(cep)) {
      throw new ParamError(cep);
    }
  }

  execute = async (cep: string): Promise<Cep> => {
    const value = this.generalParse(cep);
    this.validateCep(value);
    try {
      const response = await this.handler(cep);
      return response;
    } catch (error) {
      throw error;
    }
  };
  abstract handler(cep: string): Promise<Cep>;
}
