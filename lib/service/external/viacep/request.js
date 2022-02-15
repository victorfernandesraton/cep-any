import fetch from "node-fetch";
import Cep from "../../../cep.js";
import RequestCep from "../requestCep.js";

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
