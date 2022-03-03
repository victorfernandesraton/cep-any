"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
var provider_1 = require("./provider");
var apicep_1 = require("./service/apicep");
var brasilAPI_1 = require("./service/brasilAPI");
var correios_1 = require("./service/correios");
var viacep_1 = require("./service/viacep");
function Factory(_a) {
    var _b = _a.useDefaultProviders, useDefaultProviders = _b === void 0 ? true : _b, custonProviders = _a.custonProviders;
    var services = [];
    if (useDefaultProviders) {
        services = [
            new viacep_1.ViaCepService(),
            new brasilAPI_1.BrasilAPIService(),
            new apicep_1.ApiCepService(),
            new correios_1.CorreiosService(),
        ];
    }
    if (custonProviders === null || custonProviders === void 0 ? void 0 : custonProviders.length) {
        services = __spreadArray(__spreadArray([], services, true), custonProviders, true);
    }
    return new provider_1.Provider(services);
}
exports.Factory = Factory;
