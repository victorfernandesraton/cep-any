import { CepService } from "../index";
export declare class CorreiosService extends CepService {
    constructor();
    handler(cep: string): Promise<Cep>;
}
