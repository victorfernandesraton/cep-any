import factory from "./factory.ts";

export type Cep = {
  cep: string;
  street: string;
  state: string;
  neighborhood: string;
  city: string;
};

export const cep = (zipcode: string | number) => {
  const handler = factory({
    useDefaultProviders: true,
  });
  return handler.execute(zipcode);
};
