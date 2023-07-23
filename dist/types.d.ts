declare module "provider" {
    /**
     * @typedef {import('./types.js').Cep} Cep
     */
    export class Provider {
        constructor(services: any);
        /**
         * @returns {Promise<Cep>}
         */
        execute(cep: any): Promise<Cep>;
        #private;
    }
    export type Cep = import("types").Cep;
}
declare module "service/index" {
    export class CepService {
        /**
         * @param {string} cep
         */
        static generalParse(cep: string): string;
        /**
         * @param {string} cep
         * @returns {boolean}
         */
        static validateCep(cep: string): boolean;
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
         * @param {string | number} cep
         * @returns {Promise<Cep>}
         */
        execute(cep: string | number): Promise<Cep>;
        /**
         * @param {string | number} _cep
         * @returns {Promise<Cep>}
         */
        handler(_cep: string | number): Promise<Cep>;
    }
    export type Cep = import("types").Cep;
}
declare module "service/apicep/index" {
    export class ApiCepService extends CepService {
        constructor(request: any);
        handler(cep: any): Promise<{
            cep: any;
            city: any;
            state: any;
            neighborhood: any;
            street: any;
        }>;
    }
    import { CepService } from "service/index.mjs";
}
declare module "service/brasilAPI/index" {
    export class BrasilAPIService extends CepService {
        constructor(request: any);
        handler(cep: any): Promise<any>;
    }
    import { CepService } from "service/index.mjs";
}
declare module "service/viacep/index" {
    export class ViaCepService extends CepService {
        static baseUrl: any;
        constructor(requester: any);
        handler(cep: any): Promise<{
            cep: any;
            state: any;
            city: any;
            street: any;
            neighborhood: any;
        }>;
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
    export function cep(cep: string | number): Promise<Cep>;
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
