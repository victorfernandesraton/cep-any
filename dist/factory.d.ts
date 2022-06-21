import { Provider } from "./provider";
import { CepService } from "./service/index";
declare type FactoryOptions = {
    useDefaultProviders?: boolean;
    custonProviders?: CepService[];
};
export declare function Factory({ useDefaultProviders, custonProviders, }: FactoryOptions): Provider;
export {};
