(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../../requester/index.js"), require("../index.js"), require("./adapters.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../../requester/index.js",
        "../index.js",
        "./adapters.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.indexJs, global.indexJs, global.adaptersJs);
})(this, function(exports, _indexJs, _indexJs1, _adaptersJs) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "ApiCepService", {
        enumerable: true,
        get: ()=>ApiCepService
    });
    class ApiCepService extends _indexJs1.CepService {
        async handler(cep) {
            const request = await (0, _indexJs.Requester)({
                url: this.baseUrl,
                params: {
                    code: cep
                }
            });
            const data = await request.json();
            if (!request.ok) {
                throw new Error(data);
            }
            return (0, _adaptersJs.responseToCep)(data);
        }
        constructor(){
            super("apicep");
            this.baseUrl = "https://ws.apicep.com/cep.json";
        }
    }
});
