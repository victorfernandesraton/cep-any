import Cep from "../../../../cep";

export function responseToCep(data: any): Cep {
  return new Cep({ ...data });
}
