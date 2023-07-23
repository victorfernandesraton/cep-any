declare module "provider" {
    /**
     * @typedef {import('./types.js').Cep} Cep
     */
    export class Provider {
        constructor(services: any);
        /**
         * @returns {Promise<Cep>}
         */
        execute(zipcode: any): Promise<Cep>;
        #private;
    }
    export type Cep = import("types").Cep;
}
declare module "requester/index" {
    export class RequestWIthFetch {
        execute({ url, body, headers, method, params }: {
            url: any;
            body: any;
            headers: any;
            method: any;
            params: any;
        }): Promise<Response>;
    }
}
declare module "errors/basicError" {
    export class BasicError extends Error {
        constructor(message: any);
    }
}
declare module "errors/paramError" {
    export class ParamError extends BasicError {
    }
    import { BasicError } from "errors/basicError.mjs";
}
declare module "service/index" {
    export class CepService {
        /**
         * @param {string} zipcode
         */
        static generalParse(zipcode: string): string;
        /**
         * @param {string} zipcode
         * @returns {boolean}
         */
        static validateCep(zipcode: string): boolean;
        /**
         * @param {any} api
         * @param {any} requester
         */
        constructor(api: any, requester: any, baseUrl?: string);
        api: any;
        requester: any;
        baseUrl: string;
        /**
         * @param {any} requester
         */
        overrideRequest(requester: any): void;
        /**
         * @param {string | number} zipcode
         * @returns {Promise<Cep>}
         */
        execute(zipcode: string | number): Promise<Cep>;
        /**
         * @param {string | number} _zipcode
         * @returns {Promise<Cep>}
         */
        handler(_zipcode: string | number): Promise<Cep>;
    }
    export type Cep = import("types").Cep;
}
declare module "service/brasilAPI/index" {
    export class BrasilAPIService extends CepService {
        constructor(request: any);
        /**
         * @typedef {import('../../types.js').Cep} Cep
         * @param {string} cep
         * @returns {Promise<Cep>}
         */
        handler(cep: string): Promise<import("types.js").Cep>;
    }
    import { CepService } from "service/index.mjs";
}
declare module "errors/parserError" {
    export class ParserError extends Error {
        constructor(api: any, message: any);
        api: string;
    }
}
declare module "service/correios/adapters" {
    export function parseParamsToXML(data: any): string;
    export function responseToCep(data: any): {
        cep: any;
        state: any;
        city: any;
        street: any;
        neighborhood: any;
    };
}
declare module "service/correios/index" {
    export class CorreiosService extends CepService {
        constructor(requester: any);
        /**
         * @typedef {import("../../types.js").Cep} Cep
         * @param {string} cep
         * @returns {Promise<Cep>}
         */
        handler(cep: string): Promise<import("types.js").Cep>;
    }
    import { CepService } from "service/index.mjs";
}
declare module "service/viacep/index" {
    export class ViaCepService extends CepService {
        constructor(requester: any);
        /**
         * @typedef {import("../../types.js").Cep} Cep
         * @param {string} cep
         * @returns {Promise<Cep>}
         */
        handler(cep: string): Promise<import("types.js").Cep>;
    }
    import { CepService } from "service/index.mjs";
}
declare module "factory" {
    /**
     *
     * @typedef {import('./service/index.mjs').CepService} CepService
     * @typedef {Object} Params
     * @property {boolean} [useDefaultProviders]
     * @property {Array<CepService>} [custonProviders]
     * @property {any} [requester]
     *
     * @returns {Provider}
     */
    export default function _default({ useDefaultProviders, custonProviders, requester, }: {
        useDefaultProviders?: boolean | undefined;
        custonProviders?: any[] | undefined;
        requester?: RequestWIthFetch | undefined;
    }): Provider;
    export type CepService = import("service/index").CepService;
    export type Params = {
        useDefaultProviders?: boolean | undefined;
        custonProviders?: import("service/index.mjs").CepService[] | undefined;
        requester?: any;
    };
    import { RequestWIthFetch } from "requester/index.mjs";
    import { Provider } from "provider.mjs";
}
declare module "cep" {
    export function cep(zipcode: string | number): Promise<Cep>;
    export type Cep = import("types").Cep;
}
declare module "index" {
    export const service: typeof CepService;
    import { CepService } from "service/index.mjs";
    import { cep } from "cep.mjs";
    import { Provider } from "provider.mjs";
    import factory from "factory.mjs";
    import { RequestWIthFetch } from "requester/index.mjs";
    export { cep, CepService, Provider, factory, RequestWIthFetch };
}
declare module "service/apicep/index" {
    export class ApiCepService extends CepService {
        constructor(request: any);
        /**
         * @typedef {import('../../types.js').Cep} Cep
         * @param {string} cep
         * @returns {Promise<Cep>}
         */
        handler(cep: string): Promise<import("types.js").Cep>;
    }
    import { CepService } from "service/index.mjs";
}
