import Cep from "../../../../cep";

export function responseToCep(data: any): Cep {
  return new Cep({
    cep: data?.cep?.replace("-", ""),
    state: data?.uf,
    city: data?.localidade,
    street: data?.logradouro,
    neighborhood: data?.bairro,
  });
}
