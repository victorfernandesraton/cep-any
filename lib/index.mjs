import Handler from "./handler.mjs";
import { providers } from "./service/index.mjs";

const handleGet = new Handler([providers.brasilAPI, providers.viacep]);
export default handleGet;

export const CustonHandler = Handler;
