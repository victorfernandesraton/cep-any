import axios from "axios";
import IGetCep from "../cepServices";
import Service from "../service";
import { responseToCep } from "./adapters/response";

export default class BrasilAPI extends Service implements IGetCep {
  readonly baseURL: string;
  constructor() {
    super("brasilAPI");
    this.baseURL = "https://brasilapi.com.br/api/cep/v1/";
  }

  getInfo = async (cep: string) => {
    const url = `${this.baseURL}${cep}`;
    try {
      const requestData = await axios.get(url, {
        method: "GET",
      });
      if (requestData.status != 200) {
        if (requestData.status === 400) {
          throw new Error("not found");
        } else {
          throw new Error("internal server error");
        }
      }

      return responseToCep(requestData.data);
    } catch (error) {
      if (typeof error == "string") {
        throw new Error(error);
      } else {
        throw error;
      }
    }
  };
}
