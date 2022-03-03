var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { CepService } from "..";
import { RequestError } from "../../errors/requestError";
import { responseToCep } from "./adapters";
export class BrasilAPIService extends CepService {
    constructor() {
        super("brasilAPI");
        Object.defineProperty(this, "handler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (cep) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const requestData = yield axios.get(`${this.baseUrl}${cep}`);
                    if (requestData.status != 200) {
                        if (requestData.status >= 400 && requestData.status <= 499) {
                            throw new RequestError("not found", this.api, requestData);
                        }
                        else {
                            throw new RequestError("invalid request", this.api, requestData);
                        }
                    }
                    const data = yield requestData.data;
                    return responseToCep(data);
                }
                catch (error) {
                    if (typeof error == "string") {
                        throw new Error(error);
                    }
                    else {
                        if (error instanceof Error &&
                            (error === null || error === void 0 ? void 0 : error.message) == "Request failed with status code 404") {
                            throw new RequestError("not found", this.api);
                        }
                        else {
                            throw error;
                        }
                    }
                }
            })
        });
        this.baseUrl = "https://brasilapi.com.br/api/cep/v1/";
    }
}
