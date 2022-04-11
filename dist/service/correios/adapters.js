!function(global, factory) {
    if ("function" == typeof define && define.amd) define([
        "exports",
        "../../errors/parserError"
    ], factory);
    else if ("undefined" != typeof exports) factory(exports, require("../../errors/parserError"));
    else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.parserError), global.adapters = mod.exports;
    }
}(this, function(_exports, _parserError) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
        value: !0
    }), _exports.parseParamsToXML = function(data) {
        return '<?xml version="1.0"?>\n	<soapenv:Envelope 		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>'.concat(data, "</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>");
    }, _exports.responseToCep = function(data) {
        try {
            var ref, ref1, _cep, _uf, _cidade, _bairro, _end, returnStatement = null !== (ref1 = null === (ref = data.replace(/\r?\n|\r/g, "").match(/<return>(.*)<\/return>/)) || void 0 === ref ? void 0 : ref[0]) && void 0 !== ref1 ? ref1 : "";
            if ("" == returnStatement) throw new _parserError.ParserError("invalid regex got ".concat(data), "correios");
            var parsedReturnStatement = returnStatement.replace("<return>", "").replace("</return>", "").split(/</).reduce(function(result, exp) {
                var splittenExp = exp.split(">");
                return splittenExp.length > 1 && splittenExp[1].trim().length && (result[null == splittenExp ? void 0 : splittenExp[0]] = splittenExp[1]), result;
            }, {});
            if ((null == parsedReturnStatement ? void 0 : parsedReturnStatement.cep) === "" || !(null == parsedReturnStatement ? void 0 : parsedReturnStatement.cep)) throw new _parserError.ParserError("not returnd a cep to parse", "correios");
            return {
                cep: null !== (_cep = parsedReturnStatement.cep) && void 0 !== _cep ? _cep : "",
                state: null !== (_uf = parsedReturnStatement.uf) && void 0 !== _uf ? _uf : "",
                city: null !== (_cidade = parsedReturnStatement.cidade) && void 0 !== _cidade ? _cidade : "",
                street: null !== (_bairro = parsedReturnStatement.bairro) && void 0 !== _bairro ? _bairro : "",
                neighborhood: null !== (_end = parsedReturnStatement.end) && void 0 !== _end ? _end : ""
            };
        } catch (e) {
            throw new _parserError.ParserError("not implement xml", "correios");
        }
    };
});
