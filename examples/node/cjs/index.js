const { cep, Provider, factory, CepService } = require("../../../dist/index");
cep("41342315").then(console.log);
console.log(cep, Provider, factory, CepService);
