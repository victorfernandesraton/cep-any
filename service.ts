import { Cep } from "./cep.ts";
import { ParamError } from "./errors.ts";

export abstract class CepService {
  constructor(
    protected API: string,
    protected requester: typeof fetch,
    protected baseUrl: string,
  ) {
  }

  overrideRequest(requester: typeof fetch) {
    this.requester = requester;
  }

  static generalParse(zipcode: string) {
    return zipcode.split("-").join("").split(".").join("");
  }

  static validateCep(zipcode: string): boolean {
    return /[0-9]{8}/.test(zipcode);
  }

  execute(zipcode: string | number) {
    let data = "";
    if (typeof zipcode === "number") {
      data = zipcode.toString();
    } else {
      data = zipcode;
    }

    const value = CepService.generalParse(data);

    if (!CepService.validateCep(value)) {
      throw new ParamError(value);
    }

    return this.handler(value);
  }

  abstract handler(zipcode: string | number): Promise<Cep>;
}
