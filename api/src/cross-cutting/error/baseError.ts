import { inherits } from "util";

class BaseError extends Error {

  constructor(protected _message: string = '', protected isOperational: boolean = false, protected internalEexception?: Error) {
    super(_message);
    this.isOperational = isOperational;
    this.message = _message || this.message;
    this.internalEexception = internalEexception;
  }

  getMessage() {
    return this.message;
  }

  isOperationalError() {
    return this.isOperational;
  }

  getInternalException() {
    return this.internalEexception;
  }

}

inherits(BaseError, Error);

export default BaseError;
