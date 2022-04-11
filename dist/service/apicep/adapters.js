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
