import { Provider } from "./provider";
import { ApiCepService } from "./service/apicep";
import { BrasilAPIService } from "./service/brasilAPI";
import { CorreiosService } from "./service/correios";
import { ViaCepService } from "./service/viacep";
export function Factory({ useDefaultProviders = true, custonProviders, }) {
    let services = [];
    if (useDefaultProviders) {
        services = [
            new ViaCepService(),
            new BrasilAPIService(),
            new ApiCepService(),
            new CorreiosService(),
        ];
    }
    if (custonProviders === null || custonProviders === void 0 ? void 0 : custonProviders.length) {
        services = [...services, ...custonProviders];
    }
    return new Provider(services);
}
