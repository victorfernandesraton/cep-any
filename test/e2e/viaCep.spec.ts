import { RequestError } from "../../src/errors/requestError";
import { ViaCepService } from "../../src/service/viacep/index";

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

	test("should be not a valid cep", async () => {
		expect(stub.execute("00000000")).rejects.toThrowError(
			new RequestError("not found", stub.api)
		);
	});
	test("should be not find value for this cep", async () => {
		expect(stub.execute("411111111")).rejects.toThrowError(
			new RequestError("not found", stub.api)
		);
	});
});
