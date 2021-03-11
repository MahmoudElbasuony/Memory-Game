import { Request, Response } from "express";
import BaseError from "./baseError";
import { appLogger as logger } from '../utils/logger';
import { inherits } from "util";

export class NotFoundError extends BaseError {

  protected readonly status = 404;
  constructor(protected _message: string, protected req: Request, innerException?: Error) {
    super(_message, true, innerException);
  }

  getStatus() {
    return this.status;
  }

  getMessage = () => {
    let errorMsg = `Status : ${this.getStatus()}`;
    const { path } = this.req || {};
    if (!this._message && !path) {
      errorMsg += ` - Not found`;
    } else if (!this._message && path) {
      errorMsg += ` - Path ${path} Not found`;
    } else if (this._message && !path) {
      errorMsg += ` - ${this._message}`;
    } else {
      errorMsg += ` - ${this._message} at ${path}`;
    }
    return errorMsg;
  };

  toString() {
    return this.getMessage();
  }
}

inherits(NotFoundError, BaseError);

export class BadRequestError extends BaseError {
  protected readonly status = 400;
  constructor(protected _message: string, protected req: Request, protected innerException?: Error) {
    super(_message, true, innerException);
  }
  getStatus() {
    return this.status;
  }
  getMessage() {
    let errorMsg = `Status : ${this.getStatus()}`;
    const { path } = this.req || {};
    if (!this._message && !path) {
      errorMsg += ` - Bad Request`;
    } else if (!this._message && path) {
      errorMsg += ` - Path ${path} Bad Request`;
    } else if (this._message && !path) {
      errorMsg += ` - ${this._message}`;
    } else {
      errorMsg += ` - ${this._message} at ${path}`;
    }
    return errorMsg;
  }

  toString() {
    return this.getMessage();
  }
}

inherits(BadRequestError, BaseError);


export class InternalError extends BaseError {
  protected readonly status: number;
  constructor(protected _message: string, protected req: Request, protected innerException?: Error) {
    super(_message, true, innerException);
    this.status = 500;
  }
  getStatus() {
    return this.status;
  }
  getMessage() {
    let errorMsg = `Status : ${this.getStatus()}`;
    const { path } = this.req || {};
    if (!this._message && !path) {
      errorMsg += ` - Intenral Error Occured`;
    } else if (!this._message && path) {
      errorMsg += ` - Path ${path} Intenral Error `;
    } else if (this._message && !path) {
      errorMsg += ` - ${this._message}`;
    } else {
      errorMsg += ` - ${this._message} at ${path}`;
    }
    return errorMsg;
  }

  toString() {
    return this.getMessage();
  };

}

inherits(InternalError, BaseError);

export function errorResult(error: any, req: Request, res: Response) {
  let errorDescription = "";
  if (error instanceof BaseError) {
    errorDescription = error.getMessage();
  } else {
    errorDescription = error.message;
  }
  res.status(error.getStatus() || 500);
  res.json({ error: errorDescription });
  logger.error(errorDescription, {
    path: req.path,
    method: req.method,
    body: req.body,
  });
  res.end();
}


