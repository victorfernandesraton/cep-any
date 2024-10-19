// provider.ts
var Provider = class {
  constructor(services) {
    this.services = services;
  }
  async execute(zipcode) {
    const result = await Promise.any(
      this.services.map((item) => item.execute(zipcode))
    );
    return result;
  }
};

// errors.ts
var ParamError = class extends Error {
  constructor(args) {
    super(`invalid params ${args}`);
  }
};
var ParserError = class extends Error {
  api;
  constructor(api, message) {
    super(message);
    this.api = api;
  }
};

// service.ts
var CepService = class _CepService {
  constructor(API, requester, baseUrl) {
    this.API = API;
    this.requester = requester;
    this.baseUrl = baseUrl;
  }
  overrideRequest(requester) {
    this.requester = requester;
  }
  static generalParse(zipcode) {
    return zipcode.split("-").join("").split(".").join("");
  }
  static validateCep(zipcode) {
    return /[0-9]{8}/.test(zipcode);
  }
  execute(zipcode) {
    let data = "";
    if (typeof zipcode === "number") {
      data = zipcode.toString();
    } else {
      data = zipcode;
    }
    const value = _CepService.generalParse(data);
    if (!_CepService.validateCep(value)) {
      throw new ParamError(value);
    }
    return this.handler(value);
  }
};

// service/brasilapi.ts
var BrasilAPIService = class extends CepService {
  constructor(request) {
    super("brasilAPI", request, "https://brasilapi.com.br/api/cep/v1");
  }
  async handler(cep2) {
    const request = await this.requester(
      `${this.baseUrl}/${cep2}`
    );
    const data = await request.json();
    if (!request.ok) {
      throw new Error(data);
    }
    return {
      ...data
    };
  }
};

// service/viacepservice.ts
var ViaCepService = class extends CepService {
  constructor(requester) {
    super("viacep", requester, "https://viacep.com.br");
  }
  async handler(cep2) {
    const request = await this.requester(`${this.baseUrl}/ws/${cep2}/json`, {
      method: "GET"
    });
    const data = await request.json();
    if (!request.ok) {
      throw new Error(data);
    }
    return {
      cep: data?.cep?.replace("-", "") ?? "",
      state: data?.uf ?? "",
      city: data?.localidade ?? "",
      street: data?.logradouro ?? "",
      neighborhood: data?.bairro ?? ""
    };
  }
};

// factory.ts
function factory_default({
  useDefaultProviders = true,
  custonProviders = [],
  requester = fetch
}) {
  let services = new Array();
  if (useDefaultProviders) {
    services = [
      new ViaCepService(requester),
      new BrasilAPIService(requester)
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

// mod.ts
var cep = (zipcode) => {
  const handler = factory_default({
    useDefaultProviders: true
  });
  return handler.execute(zipcode);
};
export {
  BrasilAPIService,
  CepService,
  ParamError,
  ParserError,
  Provider,
  ViaCepService,
  cep,
  factory_default as factory
};
