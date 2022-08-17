declare module "entity/index" {
    export class Cep {
        static create({ cep, street, city, state, neighborhood, }: {
            cep: string;
            street: string;
            state: string;
            neighborhood: string;
        }): Cep;
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
declare module "service/index" {
    export class CepService {
        static api: any;
        constructor(api: any);
        baseUrl: string;
        api: any;
        generalParse(cep: any): any;
        validateCep(cep: any): void;
        execute(cep: any): Promise<void>;
        handler(cep: any): Promise<void>;
    }
}
declare module "provider" {
    export class Provider {
        constructor(services: CepService[]);
        services: CepService[];
        execute(cep: any): Promise<void>;
    }
    import { CepService } from "service";
}
declare module "requester/index" {
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
declare module "service/apicep/adapters" {
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
    export default function _default({ useDefaultProviders, custonProviders, }: {
        useDefaultProviders?: boolean;
        custonProviders: any;
    }): Provider;
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
    }
    export default _default;
    import { Cep } from "entity";
    import { cep } from "cep";
    import { CepService } from "service";
    import { Provider } from "provider";
    import factory from "factory";
}
declare module "index" {
    export const cep: (cep: string) => Promise<import("entity").Cep>;
    export const Provider: typeof import("provider").Provider;
    export const Cep: typeof import("entity").Cep;
    export const CepService: typeof import("service").CepService;
    export const factory: typeof import("factory").default;
}
