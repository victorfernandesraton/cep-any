import { Cep } from "./entity/cep.js";
import { CepService } from "./service/index.js";
export declare class Provider {
    services: CepService[];
    constructor(services: CepService[]);
    execute: (cep: string) => Promise<Cep>;
}
