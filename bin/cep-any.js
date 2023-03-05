#!/usr/bin/env node
const { argv, exit } = require('node:process')
const { cep } = require('../dist/cjs/index.js');

(async function main() {
    const value = argv[2]
    const data = await cep(value)
    return data

}())
    .then(console.info)
    .catch(console.error)
    .finally(exit)
