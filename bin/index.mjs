import { argv, exit } from 'node:process'
import { cep } from '../dist/esm/index.mjs'

const value = argv[2]

if (!value) {
    throw new Error('expected arg')
}

const data = await cep(value)

console.info(data)

exit()