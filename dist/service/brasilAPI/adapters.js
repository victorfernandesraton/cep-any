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
        return _indexJs.Cep.create({
            ...data
        });
    }
});
