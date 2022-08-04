import { CepService } from "../index";
export declare class BrasilAPIService extends CepService {
    constructor();
    handler(cep: string): Promise<Cep>;
}
