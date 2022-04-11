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
        return _factory.Factory({
            useDefaultProviders: !0
        }).execute(cep);
    };
});
