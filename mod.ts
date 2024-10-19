import type { Cep } from "./cep.ts";
import factory from "./factory.ts";
export type { FactoryOptions } from "./factory.ts";
export { ViaCepService } from "./service/viacepservice.ts";
export { CepService } from "./service.ts";
export { Provider } from "./provider.ts";
export { ParamError, ParserError } from "./errors.ts";
export { BrasilAPIService } from "./service/brasilapi.ts";

const cep = (zipcode: string | number): Promise<Cep> => {
  const handler = factory({
    useDefaultProviders: true,
  });
  return handler.execute(zipcode);
};

export { cep, factory };
