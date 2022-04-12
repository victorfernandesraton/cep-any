import { Cep } from "../../entity/cep";
import { CepService } from "../index";
export declare class ApiCepService extends CepService {
    constructor();
    handler(cep: string): Promise<Cep>;
}
