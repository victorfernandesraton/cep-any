import axios from "axios";
import { CepService } from "..";
import { Cep } from "../../entity/cep";
import { responseToCep } from "./adapters";

export class BrasilAPIService extends CepService {
  readonly baseURL: string;
  constructor() {
    super("brasilAPI");
    this.baseURL = "https://brasilapi.com.br/api/cep/v1/";
  }

  execute = async (cep: string): Promise<Cep> => {
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

      const data = await requestData.data;

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
