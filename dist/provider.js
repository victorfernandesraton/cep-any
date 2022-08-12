// eslint-disable-next-line no-unused-vars
(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./service/index.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./service/index.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.provider = {}, global.indexJs);
})(this, function(exports, _indexJs) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "Provider", {
        enumerable: true,
        get: ()=>Provider
    });
    class Provider {
        async execute(cep) {
            try {
                const result = await Promise.any(this.services.map((item)=>item.execute(cep)));
                return result;
            } catch (error) {
                throw new Error("error in execute cep");
            }
        }
        /**
	 *
	 * @param {CepService[]} services
	 */ constructor(services){
            this.services = void 0;
            this.services = services;
        }
    }
});
