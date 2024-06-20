// src/errors/basicError.mjs
var BasicError = class extends Error {
  /**
   * @param {string} [message]
  */
  constructor(message) {
    super(message);
  }
};

// src/errors/paramError.mjs
var ParamError = class extends BasicError {
  constructor(args) {
    super(`invalid params ${args}`);
  }
};

// src/service/index.mjs
var CepService = class _CepService {
  /**
  * @param {string} api
  * @param {RequestWIthFetch} requester
  * @param {string} [baseUrl='']
  */
  constructor(api, requester, baseUrl = "") {
    this.api = api;
    this.requester = requester;
    this.baseUrl = baseUrl;
  }
  /**
   * @param {RequestWIthFetch} requester
  */
  overrideRequest(requester) {
    this.requester = requester;
  }
  /**
    * @param {string} zipcode
  */
  static generalParse(zipcode) {
    return zipcode.split("-").join("").split(".").join("");
  }
  /**
  * @param {string} zipcode
  * @returns {boolean}
  */
  static validateCep(zipcode) {
    return /[0-9]{8}/.test(zipcode);
  }
  /**
  * @param {string | number} zipcode
  * @returns {Promise<Cep>}
  */
  async execute(zipcode) {
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
  /**
  * @param {string | number} _zipcode
  * @returns {Promise<Cep>}
  */
  handler(_zipcode) {
    throw new Error("Not implemented");
  }
};

// src/provider.mjs
var Provider = class {
  #services;
  /**
   * @param {CepService[]} services
  */
  constructor(services) {
    this.#services = services;
  }
  /**
  * @param {string | number} zipcode
  * @returns {Promise<Cep>}
  */
  async execute(zipcode) {
    const result = await Promise.any(
      this.#services.map((item) => item.execute(zipcode))
    );
    return result;
  }
};

// src/requester/index.mjs
var RequestWIthFetch = class {
  /**
   * @param {Object} param
   * @param {string | URL} param.url
   * @param {BodyInit} [param.body]
   * @param {Object} [param.headers]
   * @param {string} [param.method]
   * @param {Object} [param.params]
  */
  async execute({ url, body, headers, method, params }) {
    const searchParams = new URLSearchParams(params);
    const options = {
      method,
      body,
      headers
    };
    const URL = `${url}?${searchParams.toString()}`;
    return fetch(URL, options);
  }
};

// src/service/brasilAPI/index.mjs
var BrasilAPIService = class extends CepService {
  /**
  * @typedef {import('../../requester/index.mjs').RequestWIthFetch} RequestWIthFetch
  * @param {RequestWIthFetch} request
  */
  constructor(request) {
    super("brasilAPI", request, "https://brasilapi.com.br/api/cep/v1");
  }
  /**
  * @typedef {import('../../types.ts').Cep} Cep
  * @param {string} cep
  * @returns {Promise<Cep>}
  */
  async handler(cep2) {
    const request = await this.requester.execute({ url: `${this.baseUrl}/${cep2}` });
    const data = await request.json();
    if (!request.ok) {
      throw new Error(data);
    }
    return {
      ...data
    };
  }
};

// src/service/viacep/index.mjs
var ViaCepService = class extends CepService {
  /**
  * @typedef {import('../../requester/index.mjs').RequestWIthFetch} RequestWIthFetch
  * @param {RequestWIthFetch} requester
  */
  constructor(requester) {
    super("viacep", requester, "https://viacep.com.br");
  }
  /**
  * @typedef {import("../../types.js").Cep} Cep
  * @param {string} cep
  * @returns {Promise<Cep>}
  */
  async handler(cep2) {
    const request = await this.requester.execute({
      url: `${this.baseUrl}/ws/${cep2}/json`,
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

// src/factory.mjs
function factory_default({
  useDefaultProviders = true,
  custonProviders = [],
  requester = new RequestWIthFetch()
}) {
  let services = [];
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
    services = [
      ...services.map((service2) => {
        service2.overrideRequest(requester);
        return service2;
      })
    ];
  }
  return new Provider(services);
}

// src/cep.mjs
var cep = (zipcode) => {
  const handler = factory_default({
    useDefaultProviders: true
  });
  return handler.execute(zipcode);
};

// src/index.mjs
var service = CepService;
export {
  CepService,
  Provider,
  RequestWIthFetch,
  cep,
  factory_default as factory,
  service
};
