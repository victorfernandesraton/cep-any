(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("../../entity/index.js"), require("../../errors/parserError.js"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "../../entity/index.js",
        "../../errors/parserError.js"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.adapters = {}, global.indexJs, global.parserErrorJs);
})(this, function(exports, _indexJs, _parserErrorJs) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function _export(target, all) {
        for(var name in all)Object.defineProperty(target, name, {
            enumerable: true,
            get: all[name]
        });
    }
    _export(exports, {
        parseParamsToXML: ()=>parseParamsToXML,
        responseToCep: ()=>responseToCep
    });
    function parseParamsToXML(data) {
        return `<?xml version="1.0"?>\n	<soapenv:Envelope 		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>${data}</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>`;
    }
    function responseToCep(data) {
        try {
            var ref;
            const returnStatement = ((ref = data.replace(/\r?\n|\r/g, "").match(/<return>(.*)<\/return>/)) == null ? void 0 : ref[0]) ?? "";
            if (returnStatement == "") {
                // TODO: create api enuns
                throw new _parserErrorJs.ParserError(`invalid regex got ${data}`, "correios");
            }
            const cleanReturnStatement = returnStatement.replace("<return>", "").replace("</return>", "");
            const parsedReturnStatement = cleanReturnStatement.split(/</).reduce((result, exp)=>{
                const splittenExp = exp.split(">");
                if (splittenExp.length > 1 && splittenExp[1].trim().length) {
                    result[splittenExp == null ? void 0 : splittenExp[0]] = splittenExp[1];
                }
                return result;
            }, {});
            if ((parsedReturnStatement == null ? void 0 : parsedReturnStatement.cep) === "" || !(parsedReturnStatement == null ? void 0 : parsedReturnStatement.cep)) {
                throw new _parserErrorJs.ParserError("not returnd a cep to parse", "correios");
            }
            return _indexJs.Cep.create({
                cep: parsedReturnStatement.cep ?? "",
                state: parsedReturnStatement.uf ?? "",
                city: parsedReturnStatement.cidade ?? "",
                street: parsedReturnStatement.bairro ?? "",
                neighborhood: parsedReturnStatement.end ?? ""
            });
        } catch (e) {
            throw new _parserErrorJs.ParserError("not implement xml", "correios");
        }
    }
});
