import { describe, it } from "mocha";

import assert from "assert";
import { cep, Factory, CepService } from "../../src";

describe("Index", () => {
	it("shoud be export a cep promise", () => {
		assert.ok(typeof cep === "function");
	});
	it("shoud be export a Factory", () => {
		assert.ok(typeof Factory === "function");
	});

	it("shoud be using a handler", async () => {
		class NewService extends CepService {
			handler = async (cep: string) => {
				return {
					cep: "88888888",
					city: "something",
					neighborhood: "something",
					street: "something",
					state: "AB",
				};
			};
		}
		const instanceService = new NewService("newService");
		const facotry = Factory({
			useDefaultProviders: false,
			custonProviders: [instanceService],
		});

		const result = await facotry.execute("41342315");

		assert.strictEqual(result.cep, "88888888");
	});
});
