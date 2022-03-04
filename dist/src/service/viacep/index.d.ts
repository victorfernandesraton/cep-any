import { CepService } from "../index.js";
import { Cep } from "../../entity/cep.js";
export declare class ViaCepService extends CepService {
    readonly baseUrl: string;
    constructor();
    handler: (cep: string) => Promise<Cep>;
}
