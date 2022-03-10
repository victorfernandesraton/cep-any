import { describe, it } from "mocha";
import assert from "assert";
import { responseToCep } from "../../src/service/apicep/adapters";

describe("apicep", () => {
	describe("responseToCep", () => {
		it("should be a validcep", () => {
			const input = {
				status: "200",
				code: "06233-030",
				state: "SP",
				city: "Osasco",
				district: "Piratininga",
				address: "Rua Paula Rodrigues",
			};

			const reuslt = responseToCep(input);
			assert.strictEqual(reuslt.cep, "06233030");
			assert.strictEqual(reuslt.state, "SP");
		});
	});
});
