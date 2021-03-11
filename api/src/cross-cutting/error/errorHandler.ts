import { appLogger as logger } from "../utils/logger";
import BaseError from "./baseError";

export async function handleError(error: Error) {
  await logger.error("Error occured", error);
}

export function isTrustedError(error: Error) {
  if (error instanceof BaseError) {
    return error.isOperationalError();
  }
  return false;
}
