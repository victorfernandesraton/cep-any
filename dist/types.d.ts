declare module "provider" {
    export class Provider {
        constructor(services: any);
        execute(cep: any): Promise<any>;
        #private;
    }
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
        static generalParse(cep: any): any;
        static validateCep(cep: any): boolean;
        constructor(api: any, requester: any, baseUrl?: string);
        api: any;
        requester: any;
        baseUrl: string;
        overrideRequest(requester: any): void;
        execute(cep: any): Promise<void>;
        handler(_cep: any): void;
    }
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
     * @typedef {Object} Params
     * @property {boolean} [useDefaultProviders]
     * @property {Array} [custonProviders]
     * @property {any} [requester]
     *
     * @returns {Provider}
     */
    export default function _default({ useDefaultProviders, custonProviders, requester, }: {
        useDefaultProviders?: boolean | undefined;
        custonProviders?: any[] | undefined;
        requester?: RequestWIthFetch | undefined;
    }): Provider;
    export type Params = {
        useDefaultProviders?: boolean | undefined;
        custonProviders?: any[] | undefined;
        requester?: any;
    };
    import { RequestWIthFetch } from "requester/index.mjs";
    import { Provider } from "provider.mjs";
}
declare module "cep" {
    export function cep(cep: any): Promise<any>;
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
