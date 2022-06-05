import { Requester } from "../../src/requester";

describe("request", () => {
	it("should be make a simple request", async () => {
		const result = await Requester({ url: "http://www.google.com" });
		expect(result.status).toEqual(200);
	});
});
