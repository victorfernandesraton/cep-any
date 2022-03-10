import assert from "assert";
import { describe, it } from "mocha";

import { ApiCepService } from "../../src/service/apicep/index";

describe("ApiCepService", () => {
	const stub = new ApiCepService();

	it("should be a valid cep", async () => {
		const result = await stub.execute("41342320");
		assert.strictEqual(result.state, "BA");
		assert.strictEqual(result.city, "Salvador");
	});
	it("should be a valid cep with -", async () => {
		const result = await stub.execute("41342-320");
		assert.strictEqual(result.state, "BA");
		assert.strictEqual(result.city, "Salvador");
	});
});
