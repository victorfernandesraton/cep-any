import { Cep } from "../../entity/cep";
import { ParserError } from "../../errors/parserError";

interface ParseXML {
  bairro?: string;
  cep?: string;
  cidade?: string;
  end?: string;
  uf?: string;
}

export function responseToCep(data: string): Cep {
  try {
    const returnStatement =
      data.replace(/\r?\n|\r/g, "").match(/<return>(.*)<\/return>/)?.[0] ?? "";
    if (returnStatement == "") {
      // TODO: create api enuns
      throw new ParserError(`invalid regex got ${data}`, "correios");
    }
    const cleanReturnStatement = returnStatement
      .replace("<return>", "")
      .replace("</return>", "");
    const parsedReturnStatement = cleanReturnStatement
      .split(/</)
      .reduce<ParseXML>((result: any, exp) => {
        const splittenExp = exp.split(">");
        if (splittenExp.length > 1 && splittenExp[1].trim().length) {
          result[splittenExp?.[0]] = splittenExp[1];
        }
        return result;
      }, {});

    return new Cep({
      cep: parsedReturnStatement.cep,
      state: parsedReturnStatement.uf,
      city: parsedReturnStatement.cidade,
      street: parsedReturnStatement.bairro,
      neighborhood: parsedReturnStatement.end,
    });
  } catch (e) {
    throw new ParserError("not implement xml", "correios");
  }
}
