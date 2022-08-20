import { describe, test, expect } from "@jest/globals"
import { cep } from "../../dist/esm/index.mjs"
describe("esm e2e test", () => {
	test("shoud be a valid returning cep", async () => {
		await expect(() => cep("41342315")).not.toThrow()
	})
})