import Cep from "../../cep";

export default interface IGetCep {
  getInfo(cep: string): Promise<Cep>;
}
