﻿declare module "entity/index" {
    export type Cep = {
        cep: string;
        street: string;
        state: string;
        neighborhood: string;
        city: string;
    };
}
declare module "errors/basicError" {
    export class BasicError extends Error {
        constructor(message: string);
    }
}
declare module "errors/paramError" {
    import { BasicError } from "errors/basicError";
    export class ParamError extends BasicError {
        constructor(args: any);
    }
}
declare module "requester/index" {
    type RequesterParams = {
        url: string;
        method?: 'POST' | 'GET';
        body?: unknown;
        params?: unknown;
        headers?: unknown;
    };
    export type RequestType = (params: RequesterParams) => Promise<unknown>;
    export function Requester({ url, method, body, params, headers, }: RequesterParams): any;
}
declare module "service/index" {
    import { Cep } from "entity/index";
    import { Requester, RequestType } from "requester/index";
    export abstract class CepService {
        private readonly api;
        protected requester: any;
        protected baseUrl: string;
        constructor(api: string, requester?: typeof Requester);
        overrideRequest(requester: RequestType): void;
        generalParse(cep: string): string;
        validateCep(cep: string): void;
        execute(cep: string): Promise<Cep>;
        abstract handler(cep: string): Promise<Cep>;
    }
}
declare module "provider" {
    import { Cep } from "entity/index";
    import { CepService } from "service/index";
    export class Provider {
        private readonly services;
        constructor(services: CepService[]);
        execute(cep: string): Promise<Cep>;
    }
}
declare module "service/apicep/index" {
    import { CepService } from "service/index";
    export class ApiCepService extends CepService {
        constructor();
        handler(cep: any): Promise<{
            cep: any;
            city: any;
            state: any;
            neighborhood: any;
            street: any;
        }>;
    }
}
declare module "service/brasilAPI/index" {
    import { CepService } from "service/index";
    export class BrasilAPIService extends CepService {
        constructor();
        handler(cep: any): Promise<any>;
    }
}
declare module "errors/parserError" {
    export class ParserError extends Error {
        api: string;
        /**
         * @param {string} api
         * @param {string?} message
         */
        constructor(api: any, message: any);
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
    import { CepService } from "service/index";
    export class CorreiosService extends CepService {
        constructor();
        handler(cep: any): Promise<{
            cep: any;
            state: any;
            city: any;
            street: any;
            neighborhood: any;
        }>;
    }
}
declare module "service/viacep/index" {
    import { CepService } from "service/index";
    export class ViaCepService extends CepService {
        static baseUrl: any;
        constructor();
        handler(cep: any): Promise<{
            cep: any;
            state: any;
            city: any;
            street: any;
            neighborhood: any;
        }>;
    }
}
declare module "factory" {
    import { Provider } from "provider";
    import { RequestType } from "requester/index";
    import { CepService } from "service/index";
    type Params = {
        useDefaultProviders?: boolean;
        custonProviders?: CepService[];
        requester?: RequestType;
    };
    export default function ({ useDefaultProviders, custonProviders, requester }: Params): Provider;
}
declare module "cep" {
    export const cep: (cep: string) => Promise<import("entity").Cep>;
}
declare module "index" {
    import { CepService } from "service/index";
    import { cep } from "cep";
    import factory from "factory";
    import { Provider } from "provider";
    import { Requester } from "requester/index";
    export { cep, CepService, Provider, factory, Requester, };
}
declare module "lib" {
    import { CepService } from "service/index";
    import factory from "factory";
    import { Provider } from "provider";
    import { Requester } from "requester/index";
    const _default: {
        cep: (cep: string) => Promise<import("entity").Cep>;
        CepService: typeof CepService;
        Provider: typeof Provider;
        factory: typeof factory;
        Requester: typeof Requester;
    };
    export default _default;
}
