declare module "errors/paramError" {
    export class ParamError {
        constructor(args: any);
    }
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
    import { CepService } from "service/index.mjs";
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
        });
        cep: string;
        street: string;
        city: any;
        state: string;
        neighborhood: string;
    }
}
declare module "service/apicep/adapters" {
    export function responseToCep(data: {
        code: string;
        state: string;
        city: string;
        district?: string;
        address: string;
    }): Cep;
    import { Cep } from "entity/index.mjs";
}
declare module "service/apicep/index" {
    export class ApiCepService extends CepService {
        constructor();
        handler(cep: any): Promise<import("entity/index.mjs").Cep>;
    }
    import { CepService } from "service/index.mjs";
}
declare module "service/brasilAPI/adapters" {
    export function responseToCep(data: any): Cep;
    import { Cep } from "entity/index.mjs";
}
declare module "service/brasilAPI/index" {
    export class BrasilAPIService extends CepService {
        constructor();
        handler(cep: any): Promise<import("entity/index.mjs").Cep>;
    }
    import { CepService } from "service/index.mjs";
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
    import { Cep } from "entity/index.mjs";
}
declare module "service/correios/index" {
    export class CorreiosService extends CepService {
        constructor();
        handler(cep: any): Promise<import("entity/index.mjs").Cep>;
    }
    import { CepService } from "service/index.mjs";
}
declare module "service/viacep/adapters" {
    export function responseToCep(data: any): Cep;
    import { Cep } from "entity/index.mjs";
}
declare module "service/viacep/index" {
    export class ViaCepService extends CepService {
        static baseUrl: any;
        constructor();
        handler(cep: any): Promise<import("entity/index.mjs").Cep>;
    }
    import { CepService } from "service/index.mjs";
}
declare module "factory" {
    export function Factory({ useDefaultProviders, custonProviders, }: {
        useDefaultProviders?: boolean;
        custonProviders: any;
    }): Provider;
    import { Provider } from "provider.mjs";
}
declare module "index" {
    export default CepAny;
    import { Factory } from "factory.mjs";
    import { Provider } from "provider.mjs";
    export function CepAny(cep: string): Cep;
    import { CepService } from "service/index.mjs";
    import { Cep } from "entity/index.mjs";
    export { Factory, Provider, CepService };
}
declare module "errors/basicError" {
    export class BasicError extends Error {
    }
}
//# sourceMappingURL=types.d.ts.map