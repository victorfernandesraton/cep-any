import * as fetch from "node-fetch";
import IGetCep from "../cepServices.js";
import Service from "../service.js";
import { responseToCep } from "./adapters/response.js";

export default class BrasilAPI extends Service implements IGetCep {
  readonly baseURL: string;
  constructor() {
    super("brasilAPI");
    this.baseURL = "https://brasilapi.com.br/api/cep/v1/";
  }

  getInfo = async (cep: string) => {
    const url = `${this.baseURL}${cep}`;
    try {
      const requestData = await fetch.default(url, {
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

      return responseToCep(data);
    } catch (error) {
      if (typeof error == "string") {
        throw new Error(error);
      } else {
        throw error;
      }
    }
  };
}
