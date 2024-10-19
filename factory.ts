import { Provider } from "./provider.ts";
import { CepService } from "./service.ts";
import { BrasilAPIService } from "./service/brasilapi.ts";
import { ViaCepService } from "./service/viacervice.ts";

export default function ({
  useDefaultProviders = true,
  custonProviders = [],
  requester = fetch,
}) {
  let services = new Array<CepService>();
  if (useDefaultProviders) {
    services = [
      new ViaCepService(requester),
      new BrasilAPIService(requester),
    ];
  }
  if (custonProviders?.length) {
    services = [...services, ...custonProviders];
  }
  if (requester) {
    services = [...services.map((service) => {
      service.overrideRequest(requester);
      return service;
    })];
  }

  return new Provider(services);
}
