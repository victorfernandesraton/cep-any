"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/index.mjs
var src_exports = {};
__export(src_exports, {
  CepService: () => CepService,
  Provider: () => Provider,
  RequestWIthFetch: () => RequestWIthFetch,
  cep: () => cep,
  factory: () => factory_default,
  service: () => service
});
module.exports = __toCommonJS(src_exports);

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// src/errors/parserError.mjs
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

// src/service/correios/adapters.mjs
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

// src/service/correios/index.mjs
var CorreiosService = class extends CepService {
  /**
   * @typedef {import('../../requester/index.mjs').RequestWIthFetch} RequestWIthFetch
   * @param {RequestWIthFetch} requester
   */
  constructor(requester) {
    super("correios", requester, "https://apps.correios.com.br");
  }
  /**
   * @typedef {import("../../types.js").Cep} Cep
   * @param {string} cep
   * @returns {Promise<Cep>}
   */
  async handler(cep2) {
    const request = await this.requester.execute({
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
      new BrasilAPIService(requester),
      new CorreiosService(requester)
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
