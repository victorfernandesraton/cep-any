import { Cep } from "./entity/cep";
import { Factory } from "./factory";
import { Provider } from "./provider";
import { CepService } from "./service";
declare function CepAny(cep: string): Promise<Cep>;
export { Factory, Provider, CepAny, CepService };
export default CepAny;
