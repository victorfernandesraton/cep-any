export default class Handler {
  constructor(services) {
    this.services = services;
  }

  execute = async (cep) => {
    try {
      const result = await Promise.any(
        this.services.map((item) => item.getCepInfo(cep))
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("error in execute cep");
    }
  };
}
