/**
 * @param {{
 * url: string,
 * method?: "GET"| "POST"| "PUT",
 * body?: any,
 * params?: any,
 * headers?: any
 * }} param0
 * @returns {{
	* json: () =>Promise<any>
	* text: () =>Promise<string>
	* ok: boolean,
	* status: number
	*}}
 */ (function(global, factory) {
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
    Object.defineProperty(exports, "Requester", {
        enumerable: true,
        get: ()=>Requester
    });
    function Requester({ url , method ="GET" , body , params , headers ,  }) {
        const searchParams = new URLSearchParams();
        const options = {
            method,
            body,
            headers
        };
        if (params) {
            for(const key in params){
                searchParams.set(key, params[key]);
            }
        }
        const URL = `${url}?${searchParams.toString()}`;
        return fetch(URL, options);
    }
});
