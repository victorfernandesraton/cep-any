import { CepAny, Factory, CepService } from "../../src";
import CepAnyDefualt from "../../src/";
describe("Index", () => {
	it("shoud be export a cep promise", () => {
		expect(typeof CepAny).toEqual("function");
	});
	it("shoud be export a Factory", () => {
		expect(typeof Factory).toEqual("function");
	});

	it("shoud be using a handler", async () => {
		class NewService extends CepService {
			handler = async (cep: string) => {
				return {
					cep: "88888888",
					city: "something",
					neighborhood: "something",
					street: "something",
					state: "AB",
				};
			};
		}
		const instanceService = new NewService("newService");
		const facotry = Factory({
			useDefaultProviders: false,
			custonProviders: [instanceService],
		});

		const result = await facotry.execute("41342315");

		expect(result.cep).toEqual("88888888");
	});

	it("should be a default export", () => {
		expect(typeof CepAnyDefualt).toEqual("function");
	});
});
