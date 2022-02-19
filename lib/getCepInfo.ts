import IGetCep from "./service/external/cepServices";

export default class GetCepInfo {
  services: IGetCep[];
  constructor(services: IGetCep[]) {
    this.services = services;
  }

  execute = async (cep: string) => {
    try {
      const result = await Promise.any(
        this.services.map((item) => item.getInfo(cep))
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("error in execute cep");
    }
  };
}
