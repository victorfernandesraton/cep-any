(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../errors/paramError.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../errors/paramError.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.paramErrorJs);
})(this, function(exports, _paramErrorJs) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "CepService", {
        enumerable: true,
        get: ()=>CepService
    });
    class CepService {
        generalParse(cep) {
            return cep.replaceAll("-", "");
        }
        validateCep(cep) {
            if (!/[0-9]{8}/.test(cep)) {
                throw new _paramErrorJs.ParamError(cep);
            }
        }
        async execute(cep) {
            const value = this.generalParse(cep);
            this.validateCep(value);
            const response = await this.handler(cep);
            return response;
        }
        // eslint-disable-next-line no-unused-vars
        async handler(cep) {
            throw new Error("not implemented");
        }
        constructor(api){
            this.baseUrl = "";
            this.api = api;
        }
    }
    CepService.api = void 0;
});
