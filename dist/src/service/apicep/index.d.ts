import { Cep } from "../../entity/cep.js";
import { CepService } from "../index.js";
export declare class ApiCepService extends CepService {
    constructor();
    handler: (cep: string) => Promise<Cep>;
}
