import { Provider } from "./provider";
import { CepService } from "./service/index";
interface FactoryOptions {
    useDefaultProviders?: boolean;
    custonProviders?: CepService[];
}
export declare function Factory({ useDefaultProviders, custonProviders, }: FactoryOptions): Provider;
export {};
