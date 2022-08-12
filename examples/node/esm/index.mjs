import {cep, Provider, factory , Cep, CepService} from "cep-any"
console.log( cep, Provider, factory, Cep, CepService )
cep("41342315").then(console.log)