import { Cep } from "../../src/entity/cep";
import { ParamError } from "../../src/errors/paramError";
import { CepService } from "../../src/service";

describe("CepService", () => {
  class CepServiceTest extends CepService {
    constructor() {
      super("testLib");
    }
    handler(cep: string): Promise<Cep> {
      throw new Error("not implemented");
    }
  }
  const stub = new CepServiceTest();

  test("should be a invalid cep", async () => {
    expect(async () => {
      await stub.execute("abc");
    }).rejects.toThrow(new ParamError("abc"));
  });
});
