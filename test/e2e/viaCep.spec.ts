import { RequestError } from "../../src/errors/requestError.js";
import { ViaCepService } from "../../src/service/viacep/index.js";

describe("ViaCepService", () => {
	const stub = new ViaCepService();

	test("should be a valid cep", async () => {
		const result = await stub.execute("41342320");
		expect(result.state).toStrictEqual("BA");
	});
	test("should be a valid cep with -", async () => {
		const result = await stub.execute("41342-320");
		expect(result.state).toStrictEqual("BA");
		expect(result.city).toStrictEqual("Salvador");
	});

	test.skip("should be not a valid cep", () => {
		expect(stub.execute("00000000")).rejects.toThrowError(
			new RequestError("not valid request", stub.api)
		);
	});
});
