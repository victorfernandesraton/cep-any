import { Factory } from "./factory";
export default function (cep) {
    const facotry = Factory({
        useDefaultProviders: true,
    });
    return facotry.execute(cep);
}
