import {cep, Provider, factory, CepService, Requester} from '../../../dist/esm/index.mjs'
console.log(cep, Provider, factory, CepService, Requester)
cep('41342315').then(console.log)