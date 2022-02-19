import Cep from "../../../../cep.js";

export function responseToCep(data: any): Cep {
  return new Cep({ ...data });
}
