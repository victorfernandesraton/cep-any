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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var Provider = (function () {
    function Provider(services) {
        var _this = this;
        Object.defineProperty(this, "services", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "execute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (cep) { return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, Promise.any(this.services.map(function (item) { return item.execute(cep); }))];
                        case 1:
                            result = _a.sent();
                            return [2, result];
                        case 2:
                            _a.sent();
                            throw new Error("error in execute cep");
                        case 3: return [2];
                    }
                });
            }); }
        });
        this.services = services;
    }
    return Provider;
}());

var BasicError = (function (_super) {
    __extends(BasicError, _super);
    function BasicError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BasicError;
}(Error));

var RequestError = (function (_super) {
    __extends(RequestError, _super);
    function RequestError(message, api, request) {
        var _this = _super.call(this, message) || this;
        Object.defineProperty(_this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.api = api;
        _this.response = request;
        return _this;
    }
    return RequestError;
}(BasicError));

var ParamError = (function (_super) {
    __extends(ParamError, _super);
    function ParamError(args) {
        return _super.call(this, "invalid params ".concat(args)) || this;
    }
    return ParamError;
}(BasicError));

var CepService = (function () {
    function CepService(api) {
        var _this = this;
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
        Object.defineProperty(this, "execute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (cep) { return __awaiter(_this, void 0, void 0, function () {
                var value, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            value = this.generalParse(cep);
                            this.validateCep(value);
                            return [4, this.handler(cep)];
                        case 1:
                            response = _a.sent();
                            return [2, response];
                    }
                });
            }); }
        });
        this.api = api;
    }
    Object.defineProperty(CepService.prototype, "generalParse", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (cep) {
            return cep.replaceAll("-", "");
        }
    });
    Object.defineProperty(CepService.prototype, "validateCep", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (cep) {
            if (!/[0-9]{8}/.test(cep)) {
                throw new ParamError(cep);
            }
        }
    });
    return CepService;
}());

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

var ApiCepService = (function (_super) {
    __extends(ApiCepService, _super);
    function ApiCepService() {
        var _this = _super.call(this, "apicep") || this;
        Object.defineProperty(_this, "handler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (cep) { return __awaiter(_this, void 0, void 0, function () {
                var requestData, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4, axios.get(this.baseUrl, {
                                    params: {
                                        code: cep,
                                    },
                                })];
                        case 1:
                            requestData = _a.sent();
                            return [4, requestData.data];
                        case 2:
                            data = _a.sent();
                            return [2, responseToCep$3(data)];
                        case 3:
                            error_1 = _a.sent();
                            if (typeof error_1 == "string") {
                                throw new Error(error_1);
                            }
                            else {
                                if (error_1 instanceof Error &&
                                    (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) == "Request failed with status code 404") {
                                    throw new RequestError("not found", this.api);
                                }
                                else {
                                    throw new RequestError("unknow error", this.api);
                                }
                            }
                        case 4: return [2];
                    }
                });
            }); }
        });
        _this.baseUrl = "https://ws.apicep.com/cep.json";
        return _this;
    }
    return ApiCepService;
}(CepService));

function responseToCep$2(data) {
    return __assign({}, data);
}

var BrasilAPIService = (function (_super) {
    __extends(BrasilAPIService, _super);
    function BrasilAPIService() {
        var _this = _super.call(this, "brasilAPI") || this;
        Object.defineProperty(_this, "handler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (cep) { return __awaiter(_this, void 0, void 0, function () {
                var requestData, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4, axios.get("".concat(this.baseUrl).concat(cep))];
                        case 1:
                            requestData = _a.sent();
                            if (requestData.status != 200) {
                                if (requestData.status >= 400 && requestData.status <= 499) {
                                    throw new RequestError("not found", this.api, requestData);
                                }
                                else {
                                    throw new RequestError("invalid request", this.api, requestData);
                                }
                            }
                            return [4, requestData.data];
                        case 2:
                            data = _a.sent();
                            return [2, responseToCep$2(data)];
                        case 3:
                            error_1 = _a.sent();
                            if (typeof error_1 == "string") {
                                throw new Error(error_1);
                            }
                            else {
                                if (error_1 instanceof Error &&
                                    (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) == "Request failed with status code 404") {
                                    throw new RequestError("not found", this.api);
                                }
                                else {
                                    throw error_1;
                                }
                            }
                        case 4: return [2];
                    }
                });
            }); }
        });
        _this.baseUrl = "https://brasilapi.com.br/api/cep/v1/";
        return _this;
    }
    return BrasilAPIService;
}(CepService));

var ParserError = (function (_super) {
    __extends(ParserError, _super);
    function ParserError(message, api) {
        var _this = _super.call(this, message) || this;
        Object.defineProperty(_this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _this.api = api;
        return _this;
    }
    return ParserError;
}(Error));

function parseParamsToXML(data) {
    return "<?xml version=\"1.0\"?>\n\t<soapenv:Envelope \t\txmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:cli=\"http://cliente.bean.master.sigep.bsb.correios.com.br/\">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>".concat(data, "</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>");
}
function responseToCep$1(data) {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        var returnStatement = (_b = (_a = data.replace(/\r?\n|\r/g, "").match(/<return>(.*)<\/return>/)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "";
        if (returnStatement == "") {
            throw new ParserError("invalid regex got ".concat(data), "correios");
        }
        var cleanReturnStatement = returnStatement
            .replace("<return>", "")
            .replace("</return>", "");
        var parsedReturnStatement = cleanReturnStatement
            .split(/</)
            .reduce(function (result, exp) {
            var splittenExp = exp.split(">");
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

var CorreiosService = (function (_super) {
    __extends(CorreiosService, _super);
    function CorreiosService() {
        var _this = _super.call(this, "correios") || this;
        Object.defineProperty(_this, "handler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (cep) { return __awaiter(_this, void 0, void 0, function () {
                var requestData, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4, axios.post("".concat(this.baseUrl, "/SigepMasterJPA/AtendeClienteService/AtendeCliente"), parseParamsToXML(cep), {
                                    headers: {
                                        "Content-Type": "application/xml",
                                    },
                                })];
                        case 1:
                            requestData = _a.sent();
                            return [4, requestData.data];
                        case 2:
                            data = _a.sent();
                            return [2, responseToCep$1(data)];
                        case 3:
                            error_1 = _a.sent();
                            if (typeof error_1 == "string") {
                                throw new Error(error_1);
                            }
                            else {
                                if (error_1 instanceof Error &&
                                    (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) == "Request failed with status code 404") {
                                    throw new RequestError("not found", this.api);
                                }
                                else {
                                    throw new RequestError("unknow error", this.api);
                                }
                            }
                        case 4: return [2];
                    }
                });
            }); }
        });
        _this.baseUrl = "https://apps.correios.com.br";
        return _this;
    }
    return CorreiosService;
}(CepService));

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

var ViaCepService = (function (_super) {
    __extends(ViaCepService, _super);
    function ViaCepService() {
        var _this = _super.call(this, "viacep") || this;
        Object.defineProperty(_this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(_this, "handler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (cep) { return __awaiter(_this, void 0, void 0, function () {
                var requestData, data, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, axios.get("".concat(this.baseUrl, "/ws/").concat(cep, "/json"), {
                                    method: "GET",
                                })];
                        case 1:
                            requestData = _a.sent();
                            data = requestData.data;
                            result = responseToCep(data);
                            return [2, result];
                        case 2:
                            error_1 = _a.sent();
                            if (typeof error_1 == "string") {
                                throw new Error(error_1);
                            }
                            else {
                                if (error_1 instanceof Error &&
                                    (error_1 === null || error_1 === void 0 ? void 0 : error_1.message) == "Request failed with status code 404") {
                                    throw new RequestError("not found", this.api);
                                }
                                else {
                                    throw error_1;
                                }
                            }
                        case 3: return [2];
                    }
                });
            }); }
        });
        _this.baseUrl = "https://viacep.com.br";
        return _this;
    }
    return ViaCepService;
}(CepService));

function Factory(_a) {
    var _b = _a.useDefaultProviders, useDefaultProviders = _b === void 0 ? true : _b, custonProviders = _a.custonProviders;
    var services = [];
    if (useDefaultProviders) {
        services = [
            new ViaCepService(),
            new BrasilAPIService(),
            new ApiCepService(),
            new CorreiosService(),
        ];
    }
    if (custonProviders === null || custonProviders === void 0 ? void 0 : custonProviders.length) {
        services = __spreadArray(__spreadArray([], services, true), custonProviders, true);
    }
    return new Provider(services);
}

function cep(cep) {
    var facotry = Factory({
        useDefaultProviders: true,
    });
    return facotry.execute(cep);
}

export { cep };
