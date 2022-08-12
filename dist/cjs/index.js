'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Cep$1 {
	/**
	 * @param {{
	 * cep: string,
	 * street: string,
	 * state: string,
	 * neighborhood: string
	 * }} param0
	 */
	constructor({
		cep,
		street,
		city,
		state,
		neighborhood,
	}) {
		this.cep = cep;
		this.street = street;
		this.city = city;
		this.state = state;
		this.neighborhood = neighborhood;
	}
	/**
	 * @param {{
	 * cep: string,
	 * street: string,
	 * state: string,
	 * neighborhood: string
	 * }} param0
	 * @returns {Cep}
	 */
	static create({
		cep,
		street,
		city,
		state,
		neighborhood,
	}) {
		return new Cep$1({
			cep,
			street,
			city,
			state,
			neighborhood,
		})
	}
}

class BasicError extends Error {}

class ParamError extends BasicError {
	constructor(args) {
		super(`invalid params ${args}`);
	}
}

class CepService$1 {
	static api
	baseUrl = ""
	constructor(api) {
		this.api = api;
	}

	generalParse(cep) {
		return cep.replaceAll("-", "")
	}

	validateCep(cep) {
		if (!/[0-9]{8}/.test(cep)) {
			throw new ParamError(cep)
		}
	}

	async execute(cep) {
		const value = this.generalParse(cep);
		this.validateCep(value);
		const response = await this.handler(cep);
		return response
	}
	// eslint-disable-next-line no-unused-vars
	async handler(cep) {
		throw new Error("not implemented")
	}
}

// eslint-disable-next-line no-unused-vars

class Provider$1 {
	services
	/**
	 *
	 * @param {CepService[]} services
	 */
	constructor(services) {
		this.services = services;
	}

	async execute(cep) {
		try {
			const result = await Promise.any(
				this.services.map((item) => item.execute(cep))
			);
			return result
		} catch (error) {
			throw new Error("error in execute cep")
		}
	}
}

/**
 * @param {{
 * url: string,
 * method?: "GET"| "POST"| "PUT",
 * body?: any,
 * params?: any,
 * headers?: any
 * }} param0
 * @returns {{
	* json: () =>Promise<any>
	* text: () =>Promise<string>
	* ok: boolean,
	* status: number
	*}}
 */
function Requester({
	url,
	method = "GET",
	body,
	params,
	headers,
}) {
	const searchParams = new URLSearchParams();
	const options = {
		method,
		body,
		headers
	};
	if (params) {
		for (const key in params) {
			searchParams.set(key, params[key]);
		}
	}

	const URL = `${url}?${searchParams.toString()}`;

	return fetch(URL, options)
}

/**
 *
 * @param {{
 * code: string;
 * state: string;
 * city: string;
 * district?: string;
 * address: string;
* }} data
 * @returns {Cep}
 */
function responseToCep$3(data) {
	return Cep$1.create({
		cep: data.code.replaceAll("-", ""),
		city: data.city,
		state: data.state,
		neighborhood: data.district ?? "",
		street: data.address,
	})
}

class ApiCepService extends CepService$1 {
	constructor() {
		super("apicep");
		this.baseUrl = "https://ws.apicep.com/cep.json";
	}
	async handler(cep) {
		const request = await Requester({
			url: this.baseUrl,
			params: {
				code: cep,
			},
		});

		const data = await request.json();

		if (!request.ok) {
			throw new Error(data)
		}

		return responseToCep$3(data)
	}
}

function responseToCep$2(data) {
	return Cep$1.create({...data})
}

class BrasilAPIService extends CepService$1 {
	constructor() {
		super("brasilAPI");
		this.baseUrl = "https://brasilapi.com.br/api/cep/v1/";
	}

	async handler(cep) {
		const request = await Requester({ url: `${this.baseUrl}/${cep}` });
		const data = await request.json();

		if (!request.ok) {
			throw new Error(data)
		}
		return responseToCep$2(data)
	}
}

class ParserError extends Error {
	api = ""

	/**
	 * @param {string} api
	 * @param {string?} message
	 */
	constructor(api, message) {
		super(message);
		this.api = api;
	}
}

function parseParamsToXML(data) {
	return `<?xml version="1.0"?>\n	<soapenv:Envelope 		xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">  <soapenv:Header />  <soapenv:Body>    <cli:consultaCEP>      <cep>${data}</cep>    </cli:consultaCEP>  </soapenv:Body></soapenv:Envelope>`
}

function responseToCep$1(data) {
	try {
		const returnStatement =
			data.replace(/\r?\n|\r/g, "").match(/<return>(.*)<\/return>/)?.[0] ?? "";
		if (returnStatement == "") {
			// TODO: create api enuns
			throw new ParserError(`invalid regex got ${data}`, "correios")
		}
		const cleanReturnStatement = returnStatement
			.replace("<return>", "")
			.replace("</return>", "");
		const parsedReturnStatement = cleanReturnStatement
			.split(/</)
			.reduce((result, exp) => {
				const splittenExp = exp.split(">");
				if (splittenExp.length > 1 && splittenExp[1].trim().length) {
					result[splittenExp?.[0]] = splittenExp[1];
				}
				return result
			}, {});

		if (parsedReturnStatement?.cep === "" || !parsedReturnStatement?.cep) {
			throw new ParserError("not returnd a cep to parse", "correios")
		}
		return Cep$1.create({
			cep: parsedReturnStatement.cep ?? "",
			state: parsedReturnStatement.uf ?? "",
			city: parsedReturnStatement.cidade ?? "",
			street: parsedReturnStatement.bairro ?? "",
			neighborhood: parsedReturnStatement.end ?? "",
		})
	} catch (e) {
		throw new ParserError("not implement xml", "correios")
	}
}

class CorreiosService extends CepService$1 {
	constructor() {
		super("correios");
		this.baseUrl = "https://apps.correios.com.br";
	}

	async handler(cep) {
		const request = await Requester({
			url: `${this.baseUrl}/SigepMasterJPA/AtendeClienteService/AtendeCliente`,
			body: parseParamsToXML(cep),
			method: "POST",
			headers: {
				"Content-Type": "application/xml",
			},
		});
		const data = await request.text();

		if (!request.ok) {
			throw new Error(data)
		}

		return responseToCep$1(data)
	}
}

function responseToCep(data) {
	return Cep$1.create({
		cep: data?.cep?.replace("-", "") ?? "",
		state: data?.uf ?? "",
		city: data?.localidade ?? "",
		street: data?.logradouro ?? "",
		neighborhood: data?.bairro ?? "",
	})
}

class ViaCepService extends CepService$1 {
	static baseUrl
	constructor() {
		super("viacep");
		this.baseUrl = "https://viacep.com.br";
	}

	async handler(cep) {
		const request = await Requester({
			url: `${this.baseUrl}/ws/${cep}/json`,
			method: "GET",
		});
		const data = await request.json();

		if (!request.ok) {
			throw new Error(data)
		}

		return responseToCep(data)
	}
}

function factory$1 ({
	useDefaultProviders = true,
	custonProviders,
}) {
	let services = [];
	if (useDefaultProviders) {
		services = [
			new ViaCepService(),
			new BrasilAPIService(),
			new ApiCepService(),
			new CorreiosService(),
		];
	}
	if (custonProviders?.length) {
		services = [...services, ...custonProviders];
	}

	return new Provider$1(services)
}

// eslint-disable-next-line no-unused-vars

/**
 *
 * @param {string} cep
 * @returns {Promise<Cep>}
 */
const cep$1 = (cep) => {
	const handler = factory$1({
		useDefaultProviders: true,
	});
	return handler.execute(cep)
};

var lib = {
	Cep: Cep$1,
	cep: cep$1,
	CepService: CepService$1,
	Provider: Provider$1,
	factory: factory$1,
};

const cep = lib.cep;
const Provider = lib.Provider;
const Cep = lib.Cep;
const CepService = lib.CepService;
const factory = lib.factory;

exports.Cep = Cep;
exports.CepService = CepService;
exports.Provider = Provider;
exports.cep = cep;
exports.factory = factory;
