import { assertRejects, assertStrictEquals } from "@std/assert";
import { CepService } from "./service.ts";
import { BrasilAPIService } from "./service/brasilapi.ts";
import { ViaCepService } from "./service/viacervice.ts";

Deno.test("index.ts", async (t) => {
  const invalidCases = ["555", "text", ""];
  await t.step("test parse is valid case", () => {
    ["41342430", "41.342.430", "41.342-430"].forEach((arg) => {
      const data = CepService.generalParse(arg);
      assertStrictEquals(data, "41342430");
      assertStrictEquals(CepService.validateCep(data), true);
    });
  });
  await t.step("test parse is not valid case", () => {
    invalidCases.forEach((arg) => {
      assertStrictEquals(
        CepService.validateCep(CepService.generalParse(arg)),
        false,
      );
    });
  });
  await t.step("validate instances", () => {
    class CepServiceInstance extends CepService {
      handler(_cep: string | number) {
        return Promise.resolve({
          cep: "88888888",
          city: "something",
          neighborhood: "something",
          street: "something",
          state: "something",
        });
      }
    }
    const stub = new CepServiceInstance("test", fetch, "cepServiceInstabce");
    invalidCases.forEach((arg) => {
      assertRejects(async () => {
        await stub.execute(arg);
      }, "Not valid");
    });
  });
});

Deno.test("BrasilAPIService", async (t) => {
  const stub = new BrasilAPIService(fetch);

  await t.step("should be a valid cep", async () => {
    const result = await stub.execute("41342430");
    assertStrictEquals(result.state, "BA");
    assertStrictEquals(result.city, "Salvador");
  });
  await t.step("should be a valid cep with -", async () => {
    const result = await stub.execute("41342-430");
    assertStrictEquals(result.state, "BA");
    assertStrictEquals(result.city, "Salvador");
  });
});

Deno.test("ViaCepService", async (t) => {
  const stub = new ViaCepService(fetch);

  await t.step("should be a valid cep", async () => {
    const result = await stub.execute("41342430");
    assertStrictEquals(result.state, "BA");
  });
  await t.step("should be a valid cep with -", async () => {
    const result = await stub.execute("41342-430");
    assertStrictEquals(result.state, "BA");
    assertStrictEquals(result.city, "Salvador");
  });
});
