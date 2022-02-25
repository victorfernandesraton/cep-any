import { ViaCepService } from "../../src/service/viacep/index";

describe("ViaCepService", () => {
  const stub = new ViaCepService();

  test("should be a valid cep", async () => {
    const result = await stub.execute("41342320");
    expect(result.state).toStrictEqual("BA");
  });
});
