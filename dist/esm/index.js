import { Factory } from "./factory";
function cep(cep) {
    const facotry = Factory({
        useDefaultProviders: true,
    });
    return facotry.execute(cep);
}
export default cep;
