"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseToCep = void 0;
function responseToCep(data) {
    var _a, _b, _c, _d, _e, _f;
    return {
        cep: (_b = (_a = data === null || data === void 0 ? void 0 : data.cep) === null || _a === void 0 ? void 0 : _a.replace("-", "")) !== null && _b !== void 0 ? _b : "",
        state: (_c = data === null || data === void 0 ? void 0 : data.uf) !== null && _c !== void 0 ? _c : "",
        city: (_d = data === null || data === void 0 ? void 0 : data.localidade) !== null && _d !== void 0 ? _d : "",
        street: (_e = data === null || data === void 0 ? void 0 : data.logradouro) !== null && _e !== void 0 ? _e : "",
        neighborhood: (_f = data === null || data === void 0 ? void 0 : data.bairro) !== null && _f !== void 0 ? _f : "",
    };
}
exports.responseToCep = responseToCep;
