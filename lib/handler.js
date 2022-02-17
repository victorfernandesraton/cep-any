export default class Handler {
  constructor(services) {
    this.services = services;
  }

  execute = async (cep) => {
    try {
      const result = await Promise.any(this.services.getCepInfo(cep));
      return result;
    } catch (error) {
      throw new Error("error in execute cep");
    }
  };
}
