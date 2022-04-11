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
			expect(reuslt.cep).toEqual("06233030");
			expect(reuslt.state).toBe("SP");
		});
	});
});
