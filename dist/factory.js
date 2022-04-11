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
    function _arrayLikeToArray(arr, len) {
        (null == len || len > arr.length) && (len = arr.length);
        for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
        return arr2;
    }
    function _toConsumableArray(arr) {
        return function(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }(arr) || function(iter) {
            if ("undefined" != typeof Symbol && null != iter[Symbol.iterator] || null != iter["@@iterator"]) return Array.from(iter);
        }(arr) || _unsupportedIterableToArray(arr) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (o) {
            if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if ("Object" === n && o.constructor && (n = o.constructor.name), "Map" === n || "Set" === n) return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }
    }
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.Factory = function(param) {
        var _useDefaultProviders = param.useDefaultProviders, custonProviders = param.custonProviders, services = [];
        return (void 0 === _useDefaultProviders || _useDefaultProviders) && (services = [
            new _index3.ViaCepService(),
            new _index1.BrasilAPIService(),
            new _index.ApiCepService(),
            new _index2.CorreiosService(), 
        ]), (null == custonProviders ? void 0 : custonProviders.length) && (services = _toConsumableArray(services).concat(_toConsumableArray(custonProviders))), new _provider.Provider(services);
    };
});
