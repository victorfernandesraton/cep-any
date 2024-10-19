import { cep, CepService, factory, Provider } from "../../../dist/esm.mjs";
console.log(cep, Provider, factory, CepService);
cep("41342315").then(console.log);
