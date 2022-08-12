(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./entity/index.js"), require("./service/index.js"), require("./cep.js"), require("./factory.js"), require("./provider.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./entity/index.js",
        "./service/index.js",
        "./cep.js",
        "./factory.js",
        "./provider.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {}, global.indexJs, global.indexJs, global.cepJs, global.factoryJs, global.providerJs);
})(this, function(exports, _indexJs, _indexJs1, _cepJs, _factoryJs, _providerJs) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function _export(target, all) {
        for(var name in all)Object.defineProperty(target, name, {
            enumerable: true,
            get: all[name]
        });
    }
    _export(exports, {
        Cep: ()=>_indexJs.Cep,
        cep: ()=>_cepJs.cep,
        CepService: ()=>_indexJs1.CepService,
        Provider: ()=>_providerJs.Provider,
        factory: ()=>_factoryJs.default,
        default: ()=>_cepJs.cep
    });
    _factoryJs = /*#__PURE__*/ _interopRequireDefault(_factoryJs);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
});
