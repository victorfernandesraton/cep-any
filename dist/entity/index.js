(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports);
    else if (typeof define === "function" && define.amd) define([
        "exports"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.index = {});
})(this, function(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "Cep", {
        enumerable: true,
        get: ()=>Cep
    });
    class Cep {
        /**
	 * @param {{
	 * cep: string,
	 * street: string,
	 * state: string,
	 * neighborhood: string
	 * }} param0
	 * @returns {Cep}
	 */ static create({ cep , street , city , state , neighborhood ,  }) {
            return new Cep({
                cep,
                street,
                city,
                state,
                neighborhood
            });
        }
        /**
	 * @param {{
	 * cep: string,
	 * street: string,
	 * state: string,
	 * neighborhood: string
	 * }} param0
	 */ constructor({ cep , street , city , state , neighborhood ,  }){
            this.cep = cep;
            this.street = street;
            this.city = city;
            this.state = state;
            this.neighborhood = neighborhood;
        }
    }
});
