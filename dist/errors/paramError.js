(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./basicError"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./basicError"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.paramError = {}, global.basicError);
})(this, function(exports, _basicError) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "ParamError", {
        enumerable: true,
        get: ()=>ParamError
    });
    class ParamError extends _basicError.BasicError {
        constructor(args){
            super(`invalid params ${args}`);
        }
    }
});
