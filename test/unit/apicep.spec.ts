import { responseToCep } from "../../src/service/apicep/adapters.js";

describe("apicep", () => {
	describe("responseToCep", () => {
		test("should be a validcep", () => {
			const input = {
				status: "200",
				code: "06233-030",
				state: "SP",
				city: "Osasco",
				district: "Piratininga",
				address: "Rua Paula Rodrigues",
			};

			const reuslt = responseToCep(input);
			expect(reuslt.cep).toBe("06233030");
			expect(reuslt.state).toBe("SP");
		});
	});
});
