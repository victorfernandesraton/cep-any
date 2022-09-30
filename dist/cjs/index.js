"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CepService: () => CepService,
  Provider: () => Provider,
  Requester: () => Requester,
  cep: () => cep,
  factory: () => factory_default
});
module.exports = __toCommonJS(src_exports);

// src/errors/basicError.ts
var BasicError = class extends Error {
  constructor(message) {
    super(message);
  }
};

// src/errors/paramError.ts
var ParamError = class extends BasicError {
  constructor(args) {
    super(`invalid params ${args}`);
  }
};

// src/requester/index.ts
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

// src/service/index.ts
var CepService = class {
  api;
  requester;
  baseUrl = "";
  constructor(api, requester = Requester) {
    this.api = api;
    this.requester = requester;
  }
  overrideRequest(requester) {
    this.requester = requester;
  }
  generalParse(cep2) {
    return cep2.replaceAll("-", "");
  }
  validateCep(cep2) {
    if (!/[0-9]{8}/.test(cep2)) {
      throw new ParamError(cep2);
    }
  }
  async execute(cep2) {
    const value = this.generalParse(cep2);
    this.validateCep(value);
    const response = await this.handler(cep2);
    return response;
  }
};

// src/provider.ts
var Provider = class {
  services;
  constructor(services) {
    this.services = services;
  }
  async execute(cep2) {
    const result = await Promise.any(
      this.services.map((item) => item.execute(cep2))
    );
    return result;
  }
};

// src/service/apicep/index.ts
var ApiCepService = class extends CepService {
  constructor() {
    super("apicep");
    this.baseUrl = "https://ws.apicep.com/cep.json";
  }
  async handler(cep2) {
    const request = await Requester({
      url: this.baseUrl,
      params: {
        code: cep2
      }
    });
    const data = await request.json();
    if (!request.ok) {
      throw new Error(data);
    }
    return {
      cep: data.code.replaceAll("-", ""),
      city: data.city,
      state: data.state,
      neighborhood: data.district ?? "",
      street: data.address
    };
  }
};

// src/service/brasilAPI/index.ts
var BrasilAPIService = class extends CepService {
  constructor() {
    super("brasilAPI");
    this.baseUrl = "https://brasilapi.com.br/api/cep/v1/";
  }
  async handler(cep2) {
    const request = await this.requester({ url: `${this.baseUrl}/${cep2}` });
    const data = await request.json();
    if (!request.ok) {
      throw new Error(data);
    }
    return {
      ...data
    };
  }
};

// src/errors/parserError.ts
var ParserError = class extends Error {
  api = "";
  constructor(api, message) {
    if (message) {
      super(message);
    } else {
      super();
    }
    this.api = api;
  }
};

// src/service/correios/adapters.ts
function parseParamsToXML(data) {
  return `<?xml version="1.0"?>
	<soapenv:Envelope 		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>${data}</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>`;
}
function responseToCep(data) {
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
    return {
      cep: parsedReturnStatement.cep ?? "",
      state: parsedReturnStatement.uf ?? "",
      city: parsedReturnStatement.cidade ?? "",
      street: parsedReturnStatement.bairro ?? "",
      neighborhood: parsedReturnStatement.end ?? ""
    };
  } catch (e) {
    throw new ParserError("not implement xml", "correios");
  }
}

// src/service/correios/index.ts
var CorreiosService = class extends CepService {
  constructor() {
    super("correios");
    this.baseUrl = "https://apps.correios.com.br";
  }
  async handler(cep2) {
    const request = await this.requester({
      url: `${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,
      body: parseParamsToXML(cep2),
      method: "POST",
      headers: {
        "Content-Type": "application/xml"
      }
    });
    const data = await request.text();
    if (!request.ok) {
      throw new Error(data);
    }
    return responseToCep(data);
  }
};

// src/service/viacep/index.ts
var ViaCepService = class extends CepService {
  constructor() {
    super("viacep");
    this.baseUrl = "https://viacep.com.br";
  }
  async handler(cep2) {
    const request = await this.requester({
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
__publicField(ViaCepService, "baseUrl");

// src/factory.ts
function factory_default({
  useDefaultProviders = true,
  custonProviders,
  requester = Requester
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
  if (requester) {
    services = [
      ...services.map((service) => {
        service.overrideRequest(requester);
        return service;
      })
    ];
  }
  return new Provider(services);
}

// src/cep.ts
var cep = (cep2) => {
  const handler = factory_default({
    useDefaultProviders: true
  });
  return handler.execute(cep2);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CepService,
  Provider,
  Requester,
  cep,
  factory
});
