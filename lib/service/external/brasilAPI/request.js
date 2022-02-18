import fetch from "node-fetch";
import Cep from "../../../cep.js";
import RequestCep from "../requestCep.js";

export default class BrasilAPI extends RequestCep {
  constructor() {
    super("brasilAPI");
    this.baseURL = "https://brasilapi.com.br/api/cep/v1/";
  }

  getCepInfo = async (cep) => {
    const url = `${this.baseURL}${cep}`;
    try {
      const requestData = await fetch(url, {
        method: "GET",
      });
      if (requestData.status != 200) {
        if (requestData.status === 400) {
          throw new Error("not found");
        } else {
          throw new Error("internal server error");
        }
      }

      const data = await requestData.json();

      return new Cep({
        ...data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
}
