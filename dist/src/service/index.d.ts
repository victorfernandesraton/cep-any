import { Cep } from "../entity/cep";
export declare abstract class CepService {
    readonly api: string;
    protected baseUrl: string;
    constructor(api: string);
    generalParse(cep: string): string;
    validateCep(cep: string): void;
    execute(cep: string): Promise<Cep>;
    abstract handler(cep: string): Promise<Cep>;
}
