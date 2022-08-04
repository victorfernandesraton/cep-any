import { CepService } from "../index";
export declare class ViaCepService extends CepService {
    readonly baseUrl: string;
    constructor();
    handler(cep: string): Promise<Cep>;
}
