import fetch from "node-fetch";
import Cep from "../../../cep.js";
import RequestCep from "../cepServices.js";

export default class ViaCepRequestCep extends RequestCep {
  constructor() {
    super("viacep");
    this.baseUrl = "https://viacep.com.br";
  }

  getCepInfo = async (cep) => {
    try {
      const resultData = await fetch(`${this.baseUrl}/ws/${cep}/json`, {
        method: "GET",
      });

      if (resultData.status != 200) {
        if (resultData.status === 400) {
          throw new Error("Cep not found");
        } else {
          throw new Error(`Service ${this.api} error`);
        }
      }

      const result = await resultData.json();
      const data = new Cep({
        cep: result?.cep?.replace("-", ""),
        state: result?.uf,
        city: result?.localidade,
        street: result?.logradouro,
        neighborhood: result?.bairro,
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  };
}
