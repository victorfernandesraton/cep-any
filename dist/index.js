!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "./provider",
        "./service/apicep/index",
        "./service/brasilAPI/index",
        "./service/correios/index",
        "./service/viacep/index"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("./provider"), require("./service/apicep/index"), require("./service/brasilAPI/index"), require("./service/correios/index"), require("./service/viacep/index"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.provider, global.index, global.index, global.index, global.index), global.factory = mod.exports;
    }
}(this, function(_exports, _provider, _index, _index1, _index2, _index3) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.Factory = function({ useDefaultProviders =!0 , custonProviders  }) {
        let services = [];
        return useDefaultProviders && (services = [
            new _index3.ViaCepService(),
            new _index1.BrasilAPIService(),
            new _index.ApiCepService(),
            new _index2.CorreiosService(), 
        ]), (null == custonProviders ? void 0 : custonProviders.length) && (services = [
            ...services,
            ...custonProviders
        ]), new _provider.Provider(services);
    };
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "./factory",
        "./provider",
        "./service"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("./factory"), require("./provider"), require("./service"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.factory, global.provider, global.service), global.index = mod.exports;
    }
}(this, function(_exports, _factory, _provider, _service) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), Object.defineProperty(_exports, "Factory", {
        enumerable: !0,
        get: function() {
            return _factory.Factory;
        }
    }), Object.defineProperty(_exports, "Provider", {
        enumerable: !0,
        get: function() {
            return _provider.Provider;
        }
    }), Object.defineProperty(_exports, "CepService", {
        enumerable: !0,
        get: function() {
            return _service.CepService;
        }
    }), _exports.CepAny = void 0, _exports.CepAny = function(cep) {
        const facotry = _factory.Factory({
            useDefaultProviders: !0
        });
        return facotry.execute(cep);
    };
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "core-js/modules/es.promise.any.js"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("core-js/modules/es.promise.any.js"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.esPromiseAnyJs), global.provider = mod.exports;
    }
}(this, function(_exports, _esPromiseAnyJs) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.Provider = class {
        async execute(cep) {
            try {
                const result = await Promise.any(this.services.map((item)=>item.execute(cep)
                ));
                return result;
            } catch (error) {
                throw new Error("error in execute cep");
            }
        }
        constructor(services){
            this.services = services;
        }
    };
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports);
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports), global.cep = mod.exports;
    }
}(this, function(_exports) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    });
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports);
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports), global.basicError = mod.exports;
    }
}(this, function(_exports) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.BasicError = class extends Error {
    };
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "./basicError"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("./basicError"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.basicError), global.paramError = mod.exports;
    }
}(this, function(_exports, _basicError) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    });
    class ParamError extends _basicError.BasicError {
        constructor(args){
            super(`invalid params ${args}`);
        }
    }
    _exports.ParamError = ParamError;
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports);
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports), global.parserError = mod.exports;
    }
}(this, function(_exports) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.ParserError = class extends Error {
        constructor(message, api){
            super(message), this.api = api;
        }
    };
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "core-js/modules/es.string.replace-all.js",
        "../errors/paramError"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("core-js/modules/es.string.replace-all.js"), require("../errors/paramError"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.esStringReplaceAllJs, global.paramError), global.index = mod.exports;
    }
}(this, function(_exports, _esStringReplaceAllJs, _paramError) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.CepService = class {
        generalParse(cep) {
            return cep.replaceAll("-", "");
        }
        validateCep(cep) {
            if (!/[0-9]{8}/.test(cep)) throw new _paramError.ParamError(cep);
        }
        async execute(cep) {
            const value = this.generalParse(cep);
            this.validateCep(value);
            const response = await this.handler(cep);
            return response;
        }
        constructor(api){
            this.baseUrl = "", this.api = api;
        }
    };
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "core-js/modules/es.string.replace-all.js"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("core-js/modules/es.string.replace-all.js"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.esStringReplaceAllJs), global.adapters = mod.exports;
    }
}(this, function(_exports, _esStringReplaceAllJs) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.responseToCep = function(data) {
        var _district;
        return {
            cep: data.code.replaceAll("-", ""),
            city: data.city,
            state: data.state,
            neighborhood: null !== (_district = data.district) && void 0 !== _district ? _district : "",
            street: data.address
        };
    };
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "axios",
        "../index",
        "./adapters"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("axios"), require("../index"), require("./adapters"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.axios, global.index, global.adapters), global.index = mod.exports;
    }
}(this, function(_exports, _axios, _index, _adapters) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    });
    class ApiCepService extends _index.CepService {
        async handler(cep) {
            const requestData = await _axios.default.get(this.baseUrl, {
                params: {
                    code: cep
                }
            }), data = await requestData.data;
            return _adapters.responseToCep(data);
        }
        constructor(){
            super("apicep"), this.baseUrl = "https://ws.apicep.com/cep.json";
        }
    }
    _exports.ApiCepService = ApiCepService;
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports);
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports), global.adapters = mod.exports;
    }
}(this, function(_exports) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.responseToCep = function(data) {
        return {
            ...data
        };
    };
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "axios",
        "../index",
        "./adapters"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("axios"), require("../index"), require("./adapters"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.axios, global.index, global.adapters), global.index = mod.exports;
    }
}(this, function(_exports, _axios, _index, _adapters) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    });
    class BrasilAPIService extends _index.CepService {
        async handler(cep) {
            const requestData = await _axios.default.get(`${this.baseUrl}${cep}`), data = await requestData.data;
            return _adapters.responseToCep(data);
        }
        constructor(){
            super("brasilAPI"), this.baseUrl = "https://brasilapi.com.br/api/cep/v1/";
        }
    }
    _exports.BrasilAPIService = BrasilAPIService;
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "core-js/modules/es.array.reduce.js",
        "../../errors/parserError"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("core-js/modules/es.array.reduce.js"), require("../../errors/parserError"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.esArrayReduceJs, global.parserError), global.adapters = mod.exports;
    }
}(this, function(_exports, _esArrayReduceJs, _parserError) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.parseParamsToXML = function(data) {
        return `<?xml version="1.0"?>\n	<soapenv:Envelope 		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>${data}</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>`;
    }, _exports.responseToCep = function(data) {
        try {
            var ref, ref1, _cep, _uf, _cidade, _bairro, _end;
            const returnStatement = null !== (ref1 = null === (ref = data.replace(/\r?\n|\r/g, "").match(/<return>(.*)<\/return>/)) || void 0 === ref ? void 0 : ref[0]) && void 0 !== ref1 ? ref1 : "";
            if ("" == returnStatement) throw new _parserError.ParserError(`invalid regex got ${data}`, "correios");
            const cleanReturnStatement = returnStatement.replace("<return>", "").replace("</return>", ""), parsedReturnStatement = cleanReturnStatement.split(/</).reduce((result, exp)=>{
                const splittenExp = exp.split(">");
                return splittenExp.length > 1 && splittenExp[1].trim().length && (result[null == splittenExp ? void 0 : splittenExp[0]] = splittenExp[1]), result;
            }, {});
            if ((null == parsedReturnStatement ? void 0 : parsedReturnStatement.cep) === "" || !(null == parsedReturnStatement ? void 0 : parsedReturnStatement.cep)) throw new _parserError.ParserError("not returnd a cep to parse", "correios");
            return {
                cep: null !== (_cep = parsedReturnStatement.cep) && void 0 !== _cep ? _cep : "",
                state: null !== (_uf = parsedReturnStatement.uf) && void 0 !== _uf ? _uf : "",
                city: null !== (_cidade = parsedReturnStatement.cidade) && void 0 !== _cidade ? _cidade : "",
                street: null !== (_bairro = parsedReturnStatement.bairro) && void 0 !== _bairro ? _bairro : "",
                neighborhood: null !== (_end = parsedReturnStatement.end) && void 0 !== _end ? _end : ""
            };
        } catch (e) {
            throw new _parserError.ParserError("not implement xml", "correios");
        }
    };
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "axios",
        "../index",
        "./adapters"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("axios"), require("../index"), require("./adapters"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.axios, global.index, global.adapters), global.index = mod.exports;
    }
}(this, function(_exports, _axios, _index, _adapters) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    });
    class CorreiosService extends _index.CepService {
        async handler(cep) {
            const requestData = await _axios.default.post(`${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`, _adapters.parseParamsToXML(cep), {
                headers: {
                    "Content-Type": "application/xml"
                }
            }), data = await requestData.data;
            return _adapters.responseToCep(data);
        }
        constructor(){
            super("correios"), this.baseUrl = "https://apps.correios.com.br";
        }
    }
    _exports.CorreiosService = CorreiosService;
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports);
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports), global.adapters = mod.exports;
    }
}(this, function(_exports) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.responseToCep = function(data) {
        var ref, ref1, ref2, ref3, ref4, ref5;
        return {
            cep: null !== (ref1 = null == data ? void 0 : null === (ref = data.cep) || void 0 === ref ? void 0 : ref.replace("-", "")) && void 0 !== ref1 ? ref1 : "",
            state: null !== (ref2 = null == data ? void 0 : data.uf) && void 0 !== ref2 ? ref2 : "",
            city: null !== (ref3 = null == data ? void 0 : data.localidade) && void 0 !== ref3 ? ref3 : "",
            street: null !== (ref4 = null == data ? void 0 : data.logradouro) && void 0 !== ref4 ? ref4 : "",
            neighborhood: null !== (ref5 = null == data ? void 0 : data.bairro) && void 0 !== ref5 ? ref5 : ""
        };
    };
});

!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "axios",
        "../index",
        "./adapters"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("axios"), require("../index"), require("./adapters"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.axios, global.index, global.adapters), global.index = mod.exports;
    }
}(this, function(_exports, _axios, _index, _adapters) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    });
    class ViaCepService extends _index.CepService {
        async handler(cep) {
            const requestData = await _axios.default.get(`${this.baseUrl}/ws/${cep}/json`, {
                method: "GET"
            }), data = requestData.data;
            return _adapters.responseToCep(data);
        }
        constructor(){
            super("viacep"), this.baseUrl = "https://viacep.com.br";
        }
    }
    _exports.ViaCepService = ViaCepService;
});


//# sourceMappingURL=index.js.map