import {cep, Provider, factory} from '../../../dist/esm/index.mjs'
console.log( cep, Provider, factory )
cep('41342315').then(console.log)