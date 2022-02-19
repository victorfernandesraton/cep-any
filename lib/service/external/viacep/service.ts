import axios from "axios";
import Cep from "../../../cep.js";
import RequestCep from "../cepServices.js";
import Service from "../service.js";
import { responseToCep } from "./adapters/response.js";

export default class ViaCepRequestCep extends Service implements RequestCep {
  readonly baseUrl: string;
  constructor() {
    super("viacep");
    this.baseUrl = "https://viacep.com.br";
  }

  getInfo = async (cep: string): Promise<Cep> => {
    try {
      const resultData = await axios.get(`${this.baseUrl}/ws/${cep}/json`, {
        method: "GET",
      });

      if (resultData.status != 200) {
        if (resultData.status === 400) {
          throw new Error("Cep not found");
        } else {
          throw new Error(`Service ${this.api} error`);
        }
      }

      const data = resultData.data;
      const result = responseToCep(data);
      return result;
    } catch (error) {
      if (typeof error == "string") {
        throw new Error(error);
      } else {
        throw error;
      }
    }
  };
}
