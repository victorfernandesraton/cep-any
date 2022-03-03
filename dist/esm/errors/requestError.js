import { BasicError } from "./basicError";
export class RequestError extends BasicError {
    constructor(message, api, request) {
        super(message);
        Object.defineProperty(this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.api = api;
        this.response = request;
    }
}
