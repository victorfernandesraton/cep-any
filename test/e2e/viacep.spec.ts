import Cep from "../../lib/cep";
import { providers } from "../../lib/service";
const handler = providers.viacep;

describe("viacep e2e", () => {
  test("should valid cep value and info", async () => {
    const response = await handler.getInfo("41342315");
    expect(response).toBeInstanceOf(Cep);
    expect(response.cep).toStrictEqual("41342315");
  });
});
