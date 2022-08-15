var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/entity/index.js
var Cep = class {
  constructor({
    cep: cep3,
    street,
    city,
    state,
    neighborhood
  }) {
    this.cep = cep3;
    this.street = street;
    this.city = city;
    this.state = state;
    this.neighborhood = neighborhood;
  }
  static create({
    cep: cep3,
    street,
    city,
    state,
    neighborhood
  }) {
    return new Cep({
      cep: cep3,
      street,
      city,
      state,
      neighborhood
    });
  }
};

// src/errors/basicError.js
var BasicError = class extends Error {
};

// src/errors/paramError.js
var ParamError = class extends BasicError {
  constructor(args) {
    super(`invalid params ${args}`);
  }
};

// src/service/index.js
var CepService = class {
  baseUrl = "";
  constructor(api) {
    this.api = api;
  }
  generalParse(cep3) {
    return cep3.replaceAll("-", "");
  }
  validateCep(cep3) {
    if (!/[0-9]{8}/.test(cep3)) {
      throw new ParamError(cep3);
    }
  }
  async execute(cep3) {
    const value = this.generalParse(cep3);
    this.validateCep(value);
    const response = await this.handler(cep3);
    return response;
  }
  async handler(cep3) {
    throw new Error("not implemented");
  }
};
__publicField(CepService, "api");

// src/provider.js
var Provider = class {
  services;
  constructor(services) {
    this.services = services;
  }
  async execute(cep3) {
    try {
      const result = await Promise.any(
        this.services.map((item) => item.execute(cep3))
      );
      return result;
    } catch (error) {
      throw new Error("error in execute cep");
    }
  }
};

// src/requester/index.js
function Requester({
  url,
  method = "GET",
  body,
  params,
  headers
}) {
  const searchParams = new URLSearchParams();
  const options = {
    method,
    body,
    headers
  };
  if (params) {
    for (const key in params) {
      searchParams.set(key, params[key]);
    }
  }
  const URL = `${url}?${searchParams.toString()}`;
  return fetch(URL, options);
}

// src/service/apicep/adapters.js
function responseToCep(data) {
  return Cep.create({
    cep: data.code.replaceAll("-", ""),
    city: data.city,
    state: data.state,
    neighborhood: data.district ?? "",
    street: data.address
  });
}

// src/service/apicep/index.js
var ApiCepService = class extends CepService {
  constructor() {
    super("apicep");
    this.baseUrl = "https://ws.apicep.com/cep.json";
  }
  async handler(cep3) {
    const request = await Requester({
      url: this.baseUrl,
      params: {
        code: cep3
      }
    });
    const data = await request.json();
    if (!request.ok) {
      throw new Error(data);
    }
    return responseToCep(data);
  }
};

// src/service/brasilAPI/adapters.js
function responseToCep2(data) {
  return Cep.create({ ...data });
}

// src/service/brasilAPI/index.js
var BrasilAPIService = class extends CepService {
  constructor() {
    super("brasilAPI");
    this.baseUrl = "https://brasilapi.com.br/api/cep/v1/";
  }
  async handler(cep3) {
    const request = await Requester({ url: `${this.baseUrl}/${cep3}` });
    const data = await request.json();
    if (!request.ok) {
      throw new Error(data);
    }
    return responseToCep2(data);
  }
};

// src/errors/parserError.js
var ParserError = class extends Error {
  api = "";
  constructor(api, message) {
    super(message);
    this.api = api;
  }
};

// src/service/correios/adapters.js
function parseParamsToXML(data) {
  return `<?xml version="1.0"?>
	<soapenv:Envelope 		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>${data}</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>`;
}
function responseToCep3(data) {
  try {
    const returnStatement = data.replace(/\r?\n|\r/g, "").match(/<return>(.*)<\/return>/)?.[0] ?? "";
    if (returnStatement == "") {
      throw new ParserError(`invalid regex got ${data}`, "correios");
    }
    const cleanReturnStatement = returnStatement.replace("<return>", "").replace("</return>", "");
    const parsedReturnStatement = cleanReturnStatement.split(/</).reduce((result, exp) => {
      const splittenExp = exp.split(">");
      if (splittenExp.length > 1 && splittenExp[1].trim().length) {
        result[splittenExp?.[0]] = splittenExp[1];
      }
      return result;
    }, {});
    if (parsedReturnStatement?.cep === "" || !parsedReturnStatement?.cep) {
      throw new ParserError("not returnd a cep to parse", "correios");
    }
    return Cep.create({
      cep: parsedReturnStatement.cep ?? "",
      state: parsedReturnStatement.uf ?? "",
      city: parsedReturnStatement.cidade ?? "",
      street: parsedReturnStatement.bairro ?? "",
      neighborhood: parsedReturnStatement.end ?? ""
    });
  } catch (e) {
    throw new ParserError("not implement xml", "correios");
  }
}

// src/service/correios/index.js
var CorreiosService = class extends CepService {
  constructor() {
    super("correios");
    this.baseUrl = "https://apps.correios.com.br";
  }
  async handler(cep3) {
    const request = await Requester({
      url: `${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,
      body: parseParamsToXML(cep3),
      method: "POST",
      headers: {
        "Content-Type": "application/xml"
      }
    });
    const data = await request.text();
    if (!request.ok) {
      throw new Error(data);
    }
    return responseToCep3(data);
  }
};

// src/service/viacep/adapters.js
function responseToCep4(data) {
  return Cep.create({
    cep: data?.cep?.replace("-", "") ?? "",
    state: data?.uf ?? "",
    city: data?.localidade ?? "",
    street: data?.logradouro ?? "",
    neighborhood: data?.bairro ?? ""
  });
}

// src/service/viacep/index.js
var ViaCepService = class extends CepService {
  constructor() {
    super("viacep");
    this.baseUrl = "https://viacep.com.br";
  }
  async handler(cep3) {
    const request = await Requester({
      url: `${this.baseUrl}/ws/${cep3}/json`,
      method: "GET"
    });
    const data = await request.json();
    if (!request.ok) {
      throw new Error(data);
    }
    return responseToCep4(data);
  }
};
__publicField(ViaCepService, "baseUrl");

// src/factory.js
function factory_default({
  useDefaultProviders = true,
  custonProviders
}) {
  let services = [];
  if (useDefaultProviders) {
    services = [
      new ViaCepService(),
      new BrasilAPIService(),
      new ApiCepService(),
      new CorreiosService()
    ];
  }
  if (custonProviders?.length) {
    services = [...services, ...custonProviders];
  }
  return new Provider(services);
}

// src/cep.js
var cep = (cep3) => {
  const handler = factory_default({
    useDefaultProviders: true
  });
  return handler.execute(cep3);
};

// src/lib.js
var lib_default = {
  Cep,
  cep,
  CepService,
  Provider,
  factory: factory_default
};

// src/index.js
var cep2 = lib_default.cep;
var Provider2 = lib_default.Provider;
var Cep2 = lib_default.Cep;
var CepService2 = lib_default.CepService;
var factory = lib_default.factory;
export {
  Cep2 as Cep,
  CepService2 as CepService,
  Provider2 as Provider,
  cep2 as cep,
  factory
};
//# sourceMappingURL=index.mjs.map
