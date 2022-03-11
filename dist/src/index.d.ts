import { Cep } from "./entity/cep";
import { Factory } from "./factory";
import { Provider } from "./provider";
import { CepService } from "./service";
declare const cep: (cep: string) => Promise<Cep>;
export { Factory, Provider, cep, CepService };
