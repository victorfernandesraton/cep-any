import { CepService } from "..";
import { Cep } from "../../entity/cep";
export declare class BrasilAPIService extends CepService {
    constructor();
    handler: (cep: string) => Promise<Cep>;
}
