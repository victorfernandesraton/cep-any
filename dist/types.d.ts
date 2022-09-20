declare module "entity/index" {
    export class Cep {
        /**
         * @param {{
         * cep: string,
         * street: string,
         * state: string,
         * neighborhood: string
         * city: string
         * }} param0
         * @returns {Cep}
         */
        static create({ cep, street, city, state, neighborhood, }: {
            cep: string;
            street: string;
            state: string;
            neighborhood: string;
            city: string;
        }): Cep;
        /**
         * @param {{
         * cep: string,
         * street: string,
         * state: string,
         * neighborhood: string
         * city: string
         * }} param0
         */
        constructor({ cep, street, city, state, neighborhood, }: {
            cep: string;
            street: string;
            state: string;
            neighborhood: string;
            city: string;
        });
        cep: string;
        street: string;
        city: string;
        state: string;
        neighborhood: string;
    }
}
declare module "errors/basicError" {
    export class BasicError extends Error {
    }
}
declare module "errors/paramError" {
    export class ParamError extends BasicError {
        constructor(args: any);
    }
    import { BasicError } from "errors/basicError";
}
declare module "requester/index" {
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
    export function Requester({ url, method, body, params, headers, }: {
        url: string;
        method?: "GET" | "POST" | "PUT";
        body?: any;
        params?: any;
        headers?: any;
    }): {
        json: () => Promise<any>;
        text: () => Promise<string>;
        ok: boolean;
        status: number;
    };
}
declare module "service/index" {
    export class CepService {
        static api: any;
        /**
         *
         * @param {string} api
         * @param {
         * ({
         * url: string,
         * method?: "GET"| "POST"| "PUT",
         * body?: any,
         * params?: any,
         * headers?: any
         * }) => Promise<{
         * json: () =>Promise<any>
         * text: () =>Promise<string>
         * ok: boolean,
         * status: number
         *}>
         * } requester
         */
        constructor(api: string, requester?: typeof Requester);
        baseUrl: string;
        api: string;
        requester: typeof Requester;
        generalParse(cep: any): any;
        validateCep(cep: any): void;
        /**
         *
         * @param {string} cep
         * @returns {Promise<Cep>}
         */
        execute(cep: string): Promise<Cep>;
        /**
         *
         * @param {string} cep
         * @returns {Promise}
         */
        handler(cep: string): Promise<any>;
    }
    import { Requester } from "requester";
}
declare module "provider" {
    export class Provider {
        /**
         *
         * @param {CepService[]} services
         */
        constructor(services: CepService[]);
        services: CepService[];
        /**
         *
         * @param {string} cep
         * @returns {Promise<Cep>}
         */
        execute(cep: string): Promise<Cep>;
    }
    import { CepService } from "service";
    import { Cep } from "entity";
}
declare module "service/apicep/adapters" {
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
    export function responseToCep(data: {
        code: string;
        state: string;
        city: string;
        district?: string;
        address: string;
    }): Cep;
    import { Cep } from "entity";
}
declare module "service/apicep/index" {
    export class ApiCepService extends CepService {
        constructor();
        handler(cep: any): Promise<import("entity").Cep>;
    }
    import { CepService } from "service";
}
declare module "service/brasilAPI/adapters" {
    export function responseToCep(data: any): Cep;
    import { Cep } from "entity";
}
declare module "service/brasilAPI/index" {
    export class BrasilAPIService extends CepService {
        constructor();
        handler(cep: any): Promise<import("entity").Cep>;
    }
    import { CepService } from "service";
}
declare module "errors/parserError" {
    export class ParserError extends Error {
        /**
         * @param {string} api
         * @param {string?} message
         */
        constructor(api: string, message: string | null);
        api: string;
    }
}
declare module "service/correios/adapters" {
    export function parseParamsToXML(data: any): string;
    export function responseToCep(data: any): Cep;
    import { Cep } from "entity";
}
declare module "service/correios/index" {
    export class CorreiosService extends CepService {
        constructor();
        handler(cep: any): Promise<import("entity").Cep>;
    }
    import { CepService } from "service";
}
declare module "service/viacep/adapters" {
    export function responseToCep(data: any): Cep;
    import { Cep } from "entity";
}
declare module "service/viacep/index" {
    export class ViaCepService extends CepService {
        static baseUrl: any;
        constructor();
        handler(cep: any): Promise<import("entity").Cep>;
    }
    import { CepService } from "service";
}
declare module "factory" {
    /**
     *
     * @param {{
     * useDefaultProviders?: boolean,
     * custonProviders?: CepService[],
     * requester?: Requester
     * }} param0
     * @returns
     */
    export default function _default({ useDefaultProviders, custonProviders, requester }: {
        useDefaultProviders?: boolean;
        custonProviders?: CepService[];
        requester?: typeof Requester;
    }): Provider;
    import { CepService } from "service";
    import { Requester } from "requester";
    import { Provider } from "provider";
}
declare module "cep" {
    export function cep(cep: string): Promise<Cep>;
    import { Cep } from "entity";
}
declare module "lib" {
    namespace _default {
        export { Cep };
        export { cep };
        export { CepService };
        export { Provider };
        export { factory };
        export { Requester };
    }
    export default _default;
    import { Cep } from "entity";
    import { cep } from "cep";
    import { CepService } from "service";
    import { Provider } from "provider";
    import factory from "factory";
    import { Requester } from "requester";
}
declare module "index" {
    export const cep: (cep: string) => Promise<import("entity").Cep>;
    export const Provider: typeof import("provider").Provider;
    export const Cep: typeof import("entity").Cep;
    export const CepService: typeof import("service").CepService;
    export const factory: typeof import("factory").default;
    export const Requester: typeof import("requester").Requester;
}
