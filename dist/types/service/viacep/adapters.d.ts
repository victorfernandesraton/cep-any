import { Cep } from "../../entity/cep";
export interface CepResponse {
    cep?: string;
    uf?: string;
    localidade?: string;
    logradouro?: string;
    bairro?: string;
}
export declare function responseToCep(data: CepResponse): Cep;
//# sourceMappingURL=adapters.d.ts.map