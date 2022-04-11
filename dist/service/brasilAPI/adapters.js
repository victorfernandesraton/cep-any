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
    function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.responseToCep = function(data) {
        return function(target) {
            for(var i = 1; i < arguments.length; i++){
                var source = null != arguments[i] ? arguments[i] : {}, ownKeys = Object.keys(source);
                "function" == typeof Object.getOwnPropertySymbols && (ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }))), ownKeys.forEach(function(key) {
                    _defineProperty(target, key, source[key]);
                });
            }
            return target;
        }({}, data);
    };
});
