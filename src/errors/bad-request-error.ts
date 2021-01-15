import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public message: string) {
    super("Invalid request parameters");
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
