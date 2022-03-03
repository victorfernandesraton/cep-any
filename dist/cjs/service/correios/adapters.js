"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseToCep = exports.parseParamsToXML = void 0;
var parserError_1 = require("../../errors/parserError");
function parseParamsToXML(data) {
    return "<?xml version=\"1.0\"?>\n\t<soapenv:Envelope \t\txmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:cli=\"http://cliente.bean.master.sigep.bsb.correios.com.br/\">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>".concat(data, "</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>");
}
exports.parseParamsToXML = parseParamsToXML;
function responseToCep(data) {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        var returnStatement = (_b = (_a = data.replace(/\r?\n|\r/g, "").match(/<return>(.*)<\/return>/)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "";
        if (returnStatement == "") {
            throw new parserError_1.ParserError("invalid regex got ".concat(data), "correios");
        }
        var cleanReturnStatement = returnStatement
            .replace("<return>", "")
            .replace("</return>", "");
        var parsedReturnStatement = cleanReturnStatement
            .split(/</)
            .reduce(function (result, exp) {
            var splittenExp = exp.split(">");
            if (splittenExp.length > 1 && splittenExp[1].trim().length) {
                result[splittenExp === null || splittenExp === void 0 ? void 0 : splittenExp[0]] = splittenExp[1];
            }
            return result;
        }, {});
        if ((parsedReturnStatement === null || parsedReturnStatement === void 0 ? void 0 : parsedReturnStatement.cep) === "" || !(parsedReturnStatement === null || parsedReturnStatement === void 0 ? void 0 : parsedReturnStatement.cep)) {
            throw new parserError_1.ParserError("not returnd a cep to parse", "correios");
        }
        return {
            cep: (_c = parsedReturnStatement.cep) !== null && _c !== void 0 ? _c : "",
            state: (_d = parsedReturnStatement.uf) !== null && _d !== void 0 ? _d : "",
            city: (_e = parsedReturnStatement.cidade) !== null && _e !== void 0 ? _e : "",
            street: (_f = parsedReturnStatement.bairro) !== null && _f !== void 0 ? _f : "",
            neighborhood: (_g = parsedReturnStatement.end) !== null && _g !== void 0 ? _g : "",
        };
    }
    catch (e) {
        throw new parserError_1.ParserError("not implement xml", "correios");
    }
}
exports.responseToCep = responseToCep;
