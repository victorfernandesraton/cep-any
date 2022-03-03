import { CepService } from "../index";
import { Cep } from "../../entity/cep";
export declare class ViaCepService extends CepService {
    readonly baseUrl: string;
    constructor();
    handler: (cep: string) => Promise<Cep>;
}
