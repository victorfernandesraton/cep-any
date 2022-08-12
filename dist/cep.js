// eslint-disable-next-line no-unused-vars
(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("./entity/index.js"), require("./factory.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "./entity/index.js",
        "./factory.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.cep = {}, global.indexJs, global.factoryJs);
})(this, function(exports, _indexJs, _factoryJs) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "cep", {
        enumerable: true,
        get: ()=>cep
    });
    _factoryJs = /*#__PURE__*/ _interopRequireDefault(_factoryJs);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    const cep = (cep)=>{
        const handler = (0, _factoryJs.default)({
            useDefaultProviders: true
        });
        return handler.execute(cep);
    };
});
