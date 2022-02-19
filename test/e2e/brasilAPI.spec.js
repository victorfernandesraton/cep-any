import Cep from "../../lib/cep.mjs";
import { providers } from "../../lib/service/index.mjs";

const handler = providers.brasilAPI;

describe("brasilAPI e2e", () => {
  test("should valid cep value and info", async () => {
    const response = await handler.getCepInfo("41342315");
    expect(response).toBe(Cep);
  });
});
