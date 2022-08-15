import {cep, Provider, factory} from "cep-any"
console.log( cep, Provider, factory )
cep("41342315").then(console.log)