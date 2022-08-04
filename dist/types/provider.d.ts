import { CepService } from "./service/index";
export declare class Provider {
    services: CepService[];
    constructor(services: CepService[]);
    execute(cep: string): Promise<Cep>;
}
