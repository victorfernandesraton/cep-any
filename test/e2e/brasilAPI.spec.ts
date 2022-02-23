import { BrasilAPIService } from "../../src/service/brasilAPI";

describe("ViaCepService", () => {
  const stub = new BrasilAPIService();

  test("should be a valid cep", async () => {
    const result = await stub.execute("41342320");
    expect(result.state).toStrictEqual("BA");
  });
});
