import { describe, it } from "mocha";
import assert from "assert";

import { responseToCep } from "../../src/service/correios/adapters";

describe("correios", () => {
	describe("adapters", () => {
		describe("responseToCep", () => {
			it("should be a valid cep xml to parse", () => {
				const data = `<soap:Envelope
								xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
								<soap:Body>
										<ns2:consultaCEPResponse
												xmlns:ns2="http://cliente.bean.master.sigep.bsb.correios.com.br/">
												<return>
														<bairro>Fazenda Grande II</bairro>
														<cep>41342320</cep>
														<cidade>Salvador</cidade>
														<complemento2></complemento2>
														<end>Rua Aurélia Lopes</end>
														<uf>BA</uf>
												</return>
										</ns2:consultaCEPResponse>
								</soap:Body>
						</soap:Envelope>`;

				const response = responseToCep(data);
				assert.strictEqual(response.cep, "41342320");
				assert.strictEqual(response.state, "BA");
				assert.strictEqual(response.city, "Salvador");
			});
		});
	});
});
