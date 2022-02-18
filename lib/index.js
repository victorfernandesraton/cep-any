import Handler from "./handler.js";
import { providers } from "./service/index.js";

const handleGet = new Handler(Object.keys(providers));
export default handleGet;
