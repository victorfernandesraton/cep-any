import { Provider } from "./provider.js";
import { CepService } from "./service/index.js";
interface FactoryOptions {
    useDefaultProviders?: boolean;
    custonProviders?: CepService[];
}
export declare function Factory({ useDefaultProviders, custonProviders, }: FactoryOptions): Provider;
export {};
