import { describe, it } from "mocha";
import assert from "assert";

import { Cep } from "../../src/entity/cep";
import { CepService } from "../../src/service/index";

describe("CepService", () => {
	class CepServiceTest extends CepService {
		constructor() {
			super("testLib");
		}
		handler(cep: string): Promise<Cep> {
			throw new Error("not implemented");
		}
	}
	const stub = new CepServiceTest();

	it("should be a invalid cep", async () => {
		assert.rejects(stub.execute("abc"));
	});
});
