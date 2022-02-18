import BrasilAPI from "./brasilAPI/request.mjs";
import ViaCepRequestCep from "./viacep/request.mjs";

export const brasilAPI = new BrasilAPI();
export const viacep = new ViaCepRequestCep();
