import { CepService } from "../index.js";
import { Cep } from "../../entity/cep.js";
export declare class CorreiosService extends CepService {
    constructor();
    handler: (cep: string) => Promise<Cep>;
}
