import axios from "axios";
import { CepService } from "..";
import { Cep } from "../../entity/cep";
import { responseToCep } from "./adapters";

export class ViaCepService extends CepService {
  readonly baseUrl: string;
  constructor() {
    super("viacep");
    this.baseUrl = "https://viacep.com.br";
  }

  execute = async (cep: string): Promise<Cep> => {
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
