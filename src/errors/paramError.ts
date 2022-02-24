import { BasicError } from "./basicError";

export class ParamError extends BasicError {
  constructor(args: string) {
    super(`invalid params ${args}`);
  }
}
