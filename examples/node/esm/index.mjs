import { cep, Provider, factory, CepService } from '../../../dist/esm.mjs'
console.log(cep, Provider, factory, CepService)
cep('41342315').then(console.log)
