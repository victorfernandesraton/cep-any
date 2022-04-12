import { Cep } from "../../src/entity/cep";
import { CepService } from "../../src/service/index";
import { ParamError } from "../../src/errors/paramError";

class CepServiceTest extends CepService {
	constructor() {
		super("testLib");
	}
	handler(cep: string): Promise<Cep> {
		throw new Error("not implemented");
	}
}
describe("CepService", () => {
	const stub = new CepServiceTest();
	it("test", () => {
		expect(2).toBe(2);
	});
	// it("should be a invalid cep", async () => {
	stub.execute("abc").catch((error) => {
		expect(error).toBeInstanceOf(ParamError);
	});
	// });
});
