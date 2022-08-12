import cepAny from "cep-any"
const {cep, factory, Provider} = cepAny
console.log(cepAny, factory, Provider)
cep("41342315").then(console.log)