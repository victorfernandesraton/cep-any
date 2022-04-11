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
