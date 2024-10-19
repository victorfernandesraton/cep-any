import { Cep } from "./cep.ts";
import factory from "./factory.ts";
import { Provider } from "./provider.ts";
import { CepService } from "./service.ts";

const cep = (zipcode: string | number) => {
  const handler = factory({
    useDefaultProviders: true,
  });
  return handler.execute(zipcode);
};

export { Cep, cep, CepService, factory, Provider };
