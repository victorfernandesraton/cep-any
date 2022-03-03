import { ParserError } from "../../errors/parserError";
export function parseParamsToXML(data) {
    return `<?xml version="1.0"?>\n	<soapenv:Envelope 		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>${data}</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>`;
}
export function responseToCep(data) {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const returnStatement = (_b = (_a = data.replace(/\r?\n|\r/g, "").match(/<return>(.*)<\/return>/)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "";
        if (returnStatement == "") {
            throw new ParserError(`invalid regex got ${data}`, "correios");
        }
        const cleanReturnStatement = returnStatement
            .replace("<return>", "")
            .replace("</return>", "");
        const parsedReturnStatement = cleanReturnStatement
            .split(/</)
            .reduce((result, exp) => {
            const splittenExp = exp.split(">");
            if (splittenExp.length > 1 && splittenExp[1].trim().length) {
                result[splittenExp === null || splittenExp === void 0 ? void 0 : splittenExp[0]] = splittenExp[1];
            }
            return result;
        }, {});
        if ((parsedReturnStatement === null || parsedReturnStatement === void 0 ? void 0 : parsedReturnStatement.cep) === "" || !(parsedReturnStatement === null || parsedReturnStatement === void 0 ? void 0 : parsedReturnStatement.cep)) {
            throw new ParserError("not returnd a cep to parse", "correios");
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
        throw new ParserError("not implement xml", "correios");
    }
}
