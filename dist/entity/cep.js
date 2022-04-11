!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports);
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports), global.cep = mod.exports;
    }
}(this, function(_exports) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    });
});
