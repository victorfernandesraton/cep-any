(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../../entity/index.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../../entity/index.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.adapters = {}, global.indexJs);
})(this, function(exports, _indexJs) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "responseToCep", {
        enumerable: true,
        get: ()=>responseToCep
    });
    function responseToCep(data) {
        var ref;
        return _indexJs.Cep.create({
            cep: (data == null ? void 0 : (ref = data.cep) == null ? void 0 : ref.replace("-", "")) ?? "",
            state: (data == null ? void 0 : data.uf) ?? "",
            city: (data == null ? void 0 : data.localidade) ?? "",
            street: (data == null ? void 0 : data.logradouro) ?? "",
            neighborhood: (data == null ? void 0 : data.bairro) ?? ""
        });
    }
});
