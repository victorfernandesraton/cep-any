import Cep from "../../cep.js";

export default interface IGetCep {
  getInfo(cep: string): Promise<Cep>;
}
