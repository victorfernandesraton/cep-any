export class ParamError extends Error {
  constructor(args: string) {
    super(`invalid params ${args}`);
  }
}
export class ParserError extends Error {
  readonly api: string;
  constructor(api: string, message: string) {
    super(message);
    this.api = api;
  }
}
