"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = require("./factory");
function cep(cep) {
    var facotry = (0, factory_1.Factory)({
        useDefaultProviders: true,
    });
    return facotry.execute(cep);
}
exports.default = cep;
