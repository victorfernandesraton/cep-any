var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ParamError } from "../errors/paramError";
export class CepService {
    constructor(api) {
        Object.defineProperty(this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "execute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (cep) => __awaiter(this, void 0, void 0, function* () {
                const value = this.generalParse(cep);
                this.validateCep(value);
                const response = yield this.handler(cep);
                return response;
            })
        });
        this.api = api;
    }
    generalParse(cep) {
        return cep.replaceAll("-", "");
    }
    validateCep(cep) {
        if (!/[0-9]{8}/.test(cep)) {
            throw new ParamError(cep);
        }
    }
}
