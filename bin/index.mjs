import { argv, exit } from 'node:process'
import { cep } from '../dist/esm/index.mjs'

console.info(cep)

const value = argv[2]

if (!value) {
    throw new Error('expected arg')
}

const data = await cep(value)

console.info(data)

exit()