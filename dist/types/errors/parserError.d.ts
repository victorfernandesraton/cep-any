export declare class ParserError extends Error {
    readonly api: string;
    constructor(message: string | undefined, api: string);
}
