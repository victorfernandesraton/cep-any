export class ParserError extends Error {
    constructor(message, api) {
        super(message);
        Object.defineProperty(this, "api", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.api = api;
    }
}
