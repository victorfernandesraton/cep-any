import { Provider } from "./provider";
import { CepService } from "./service";
interface FactoryOptions {
    useDefaultProviders?: boolean;
    custonProviders?: CepService[];
}
export declare function Factory({ useDefaultProviders, custonProviders, }: FactoryOptions): Provider;
export {};
//# sourceMappingURL=factory.d.ts.map