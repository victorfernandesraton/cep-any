import { strict as assert } from "assert";
import CepAny from "../lib/index.mjs";

async function SimpleTest() {
  const result = await CepAny.execute("41342315");
  assert.equal(result?.state, "BA");
}

// async function ErrorInvalidCep() {
//   await assert.rejects(async () => {
//     await CepAny.execute("abc");
//   }, "error in execute cep");
// }

await SimpleTest();
// await ErrorInvalidCep();
