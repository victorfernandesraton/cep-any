import { Cep } from "./entity/cep";
import { CepService } from "./service";
export declare class Provider {
    services: CepService[];
    constructor(services: CepService[]);
    execute: (cep: string) => Promise<Cep>;
}
//# sourceMappingURL=provider.d.ts.map