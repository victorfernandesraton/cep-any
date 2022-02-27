import { RequestError } from "../../src/errors/requestError";
import { ApiCepService } from "../../src/service/apicep/index";

describe("ApiCepService", () => {
	const stub = new ApiCepService();

	test("should be a valid cep", async () => {
		const result = await stub.execute("41342320");
		expect(result.state).toStrictEqual("BA");
		expect(result.city).toStrictEqual("Salvador");
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
});
