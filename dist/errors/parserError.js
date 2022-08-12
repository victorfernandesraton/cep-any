(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports);
    else if (typeof define === "function" && define.amd) define([
        "exports"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.parserError = {});
})(this, function(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "ParserError", {
        enumerable: true,
        get: ()=>ParserError
    });
    class ParserError extends Error {
        /**
	 * @param {string} api
	 * @param {string?} message
	 */ constructor(api, message){
            super(message);
            this.api = "";
            this.api = api;
        }
    }
});
