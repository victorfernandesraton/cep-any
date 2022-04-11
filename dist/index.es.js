import axios from 'axios';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class Provider {
    constructor(services) {
        Object.defineProperty(this, "services", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.services = services;
    }
    execute(cep) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Promise.any(this.services.map((item) => item.execute(cep)));
                return result;
            }
            catch (error) {
                throw new Error("error in execute cep");
            }
        });
    }
}

class BasicError extends Error {
}

class ParamError extends BasicError {
    constructor(args) {
        super(`invalid params ${args}`);
    }
}

class CepService {
    constructor(api) {
        Object.defineProperty(this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        this.api = api;
    }
    generalParse(cep) {
        return cep.replaceAll("-", "");
    }
    validateCep(cep) {
        if (!/[0-9]{8}/.test(cep)) {
            throw new ParamError(cep);
        }
    }
    execute(cep) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = this.generalParse(cep);
            this.validateCep(value);
            const response = yield this.handler(cep);
            return response;
        });
    }
}

function responseToCep$3(data) {
    var _a;
    return {
        cep: data.code.replaceAll("-", ""),
        city: data.city,
        state: data.state,
        neighborhood: (_a = data.district) !== null && _a !== void 0 ? _a : "",
        street: data.address,
    };
}

class ApiCepService extends CepService {
    constructor() {
        super("apicep");
        this.baseUrl = "https://ws.apicep.com/cep.json";
    }
    handler(cep) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestData = yield axios.get(this.baseUrl, {
                params: {
                    code: cep,
                },
            });
            const data = yield requestData.data;
            return responseToCep$3(data);
        });
    }
}

function responseToCep$2(data) {
    return Object.assign({}, data);
}

class BrasilAPIService extends CepService {
    constructor() {
        super("brasilAPI");
        this.baseUrl = "https://brasilapi.com.br/api/cep/v1/";
    }
    handler(cep) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestData = yield axios.get(`${this.baseUrl}${cep}`);
            const data = yield requestData.data;
            return responseToCep$2(data);
        });
    }
}

class ParserError extends Error {
    constructor(message, api) {
        super(message);
        Object.defineProperty(this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.api = api;
    }
}

function parseParamsToXML(data) {
    return `<?xml version="1.0"?>\n	<soapenv:Envelope 		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>${data}</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>`;
}
function responseToCep$1(data) {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const returnStatement = (_b = (_a = data.replace(/\r?\n|\r/g, "").match(/<return>(.*)<\/return>/)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "";
        if (returnStatement == "") {
            throw new ParserError(`invalid regex got ${data}`, "correios");
        }
        const cleanReturnStatement = returnStatement
            .replace("<return>", "")
            .replace("</return>", "");
        const parsedReturnStatement = cleanReturnStatement
            .split(/</)
            .reduce((result, exp) => {
            const splittenExp = exp.split(">");
            if (splittenExp.length > 1 && splittenExp[1].trim().length) {
                result[splittenExp === null || splittenExp === void 0 ? void 0 : splittenExp[0]] = splittenExp[1];
            }
            return result;
        }, {});
        if ((parsedReturnStatement === null || parsedReturnStatement === void 0 ? void 0 : parsedReturnStatement.cep) === "" || !(parsedReturnStatement === null || parsedReturnStatement === void 0 ? void 0 : parsedReturnStatement.cep)) {
            throw new ParserError("not returnd a cep to parse", "correios");
        }
        return {
            cep: (_c = parsedReturnStatement.cep) !== null && _c !== void 0 ? _c : "",
            state: (_d = parsedReturnStatement.uf) !== null && _d !== void 0 ? _d : "",
            city: (_e = parsedReturnStatement.cidade) !== null && _e !== void 0 ? _e : "",
            street: (_f = parsedReturnStatement.bairro) !== null && _f !== void 0 ? _f : "",
            neighborhood: (_g = parsedReturnStatement.end) !== null && _g !== void 0 ? _g : "",
        };
    }
    catch (e) {
        throw new ParserError("not implement xml", "correios");
    }
}

class CorreiosService extends CepService {
    constructor() {
        super("correios");
        this.baseUrl = "https://apps.correios.com.br";
    }
    handler(cep) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestData = yield axios.post(`${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`, parseParamsToXML(cep), {
                headers: {
                    "Content-Type": "application/xml",
                },
            });
            const data = yield requestData.data;
            return responseToCep$1(data);
        });
    }
}

function responseToCep(data) {
    var _a, _b, _c, _d, _e, _f;
    return {
        cep: (_b = (_a = data === null || data === void 0 ? void 0 : data.cep) === null || _a === void 0 ? void 0 : _a.replace("-", "")) !== null && _b !== void 0 ? _b : "",
        state: (_c = data === null || data === void 0 ? void 0 : data.uf) !== null && _c !== void 0 ? _c : "",
        city: (_d = data === null || data === void 0 ? void 0 : data.localidade) !== null && _d !== void 0 ? _d : "",
        street: (_e = data === null || data === void 0 ? void 0 : data.logradouro) !== null && _e !== void 0 ? _e : "",
        neighborhood: (_f = data === null || data === void 0 ? void 0 : data.bairro) !== null && _f !== void 0 ? _f : "",
    };
}

class ViaCepService extends CepService {
    constructor() {
        super("viacep");
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.baseUrl = "https://viacep.com.br";
    }
    handler(cep) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestData = yield axios.get(`${this.baseUrl}/ws/${cep}/json`, {
                method: "GET",
            });
            const data = requestData.data;
            return responseToCep(data);
        });
    }
}

function Factory({ useDefaultProviders = true, custonProviders, }) {
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

function CepAny(cep) {
    const facotry = Factory({
        useDefaultProviders: true,
    });
    return facotry.execute(cep);
}

export { CepAny, CepService, Factory, Provider };
