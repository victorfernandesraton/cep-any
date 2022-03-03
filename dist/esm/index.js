import { Factory } from "./factory";
const cep = (cep) => {
    const facotry = Factory({
        useDefaultProviders: true,
    });
    return facotry.execute(cep);
};
export default cep;
