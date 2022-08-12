(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./provider.js"), require("./service/apicep/index.js"), require("./service/brasilAPI/index.js"), require("./service/correios/index.js"), require("./service/viacep/index.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./provider.js",
        "./service/apicep/index.js",
        "./service/brasilAPI/index.js",
        "./service/correios/index.js",
        "./service/viacep/index.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.factory = {}, global.providerJs, global.indexJs, global.indexJs, global.indexJs, global.indexJs);
})(this, function(exports, _providerJs, _indexJs, _indexJs1, _indexJs2, _indexJs3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "default", {
        enumerable: true,
        get: ()=>_default
    });
    function _default({ useDefaultProviders =true , custonProviders ,  }) {
        let services = [];
        if (useDefaultProviders) {
            services = [
                new _indexJs3.ViaCepService(),
                new _indexJs1.BrasilAPIService(),
                new _indexJs.ApiCepService(),
                new _indexJs2.CorreiosService(), 
            ];
        }
        if (custonProviders == null ? void 0 : custonProviders.length) {
            services = [
                ...services,
                ...custonProviders
            ];
        }
        return new _providerJs.Provider(services);
    }
});
