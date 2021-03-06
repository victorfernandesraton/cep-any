import { ViaCepService } from "../../src/service/viacep/index";

describe("ViaCepService", () => {
	const stub = new ViaCepService();

	it("should be a valid cep", async () => {
		const result = await stub.execute("41342320");
		expect(result.state).toEqual("BA");
	});
	it("should be a valid cep with -", async () => {
		const result = await stub.execute("41342-320");
		expect(result.state).toEqual("BA");
		expect(result.city).toEqual("Salvador");
	});
});
