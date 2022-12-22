declare module "entity/cep" {
    export type Cep = {
        cep: string;
        street: string;
        state: string;
        neighborhood: string;
        city: string;
    };
}
declare module "entity/index" {
    import { Cep } from "entity/cep";
    export { Cep };
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
    export type RequesterParams = {
        url: string;
        method?: 'POST' | 'GET';
        body?: BodyInit | null | undefined;
        params?: unknown & any;
        headers?: HeadersInit;
    };
    export type RequestType = (params: RequesterParams) => Promise<Response>;
    export function Requester({ url, body, headers, method, params }: RequesterParams): Promise<Response>;
}
declare module "service/index" {
    import { Cep } from "entity/index";
    import { RequesterParams } from "requester/index";
    export abstract class CepService {
        private readonly api;
        protected baseUrl: string;
        protected requester: (params: RequesterParams) => Promise<Response>;
        constructor(api: string);
        overrideRequest(requester: (params: RequesterParams) => Promise<Response>): void;
        static generalParse(cep: string): string;
        static validateCep(cep: string): boolean;
        execute(cep: string | number): Promise<Cep>;
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
        handler(cep: string): Promise<{
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
        private readonly api;
        constructor(api: string, message: string);
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
    import { Cep } from "entity/index";
    export const cep: (cep: string) => Promise<Cep>;
}
declare module "index" {
    import { CepService } from "service/index";
    import { cep } from "cep";
    import factory from "factory";
    import { Provider } from "provider";
    import { Requester } from "requester/index";
    export { cep, CepService, Provider, factory, Requester, };
}
