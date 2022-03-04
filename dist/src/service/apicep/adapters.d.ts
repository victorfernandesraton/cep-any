import { Cep } from "../../entity/cep.js";
interface CepResponse {
    code: string;
    state: string;
    city: string;
    district?: string;
    address: string;
}
export declare function responseToCep(data: CepResponse): Cep;
export {};
