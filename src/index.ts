import { Factory } from "factory";

export default async function (cep: string) {
  const facotry = Factory({
    useDefaultProviders: true,
  });
  return facotry.execute(cep);
}
