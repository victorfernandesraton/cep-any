const {cep, Provider, factory, CepService} = require("cep-any")
cep("41342315").then(console.log)
console.log(Provider, factory, CepService)