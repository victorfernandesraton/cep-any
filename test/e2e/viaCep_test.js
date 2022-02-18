import { strict as assert } from "assert";
import { providers } from "../../lib/service/index.js";

const handler = providers.viacep;

async function SimpleTest() {
  const result = await handler.getCepInfo("41342315");
  assert.equal(result?.state, "BA");
}

async function ErrorInvalidCep() {
  await assert.rejects(async () => {
    await handler.getCepInfo("j");
  }, "Cep not found");
}

await SimpleTest();
await ErrorInvalidCep();
