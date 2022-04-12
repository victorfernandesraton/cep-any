import { BrasilAPIService } from "../../src/service/brasilAPI/index";

describe("BrasilAPIService", () => {
	const stub = new BrasilAPIService();

	test("should be a valid cep", async () => {
		const result = await stub.execute("41342320");
		expect(result.state).toBe("BA");
		expect(result.city).toBe("Salvador");
	});
	test("should be a valid cep with -", async () => {
		const result = await stub.execute("41342-320");
		expect(result.state).toBe("BA");
		expect(result.city).toBe("Salvador");
	});
});
