import Joi from "joi";
import { NextFunction, Request, Response } from 'express';
import { BadRequestError, errorResult } from '../cross-cutting/error/apiErrors';
import { Constants } from '../cross-cutting/constants';
import { TurnStatus } from '../models/db-models/turn.model';


export function getCardsRandomNumbersValidator(req: Request, res: Response, next: NextFunction) {
  const getCardsRandomNumbers = { cardsNumber: Joi.number().required().min(Constants.MIN_CARD_NUMBER).max(Constants.MAX_CARD_NUMBER) };
  handleValidationError(getCardsRandomNumbers, req.query, req, res, next);
};

export function getAllTurnsHistoryValidator(req: Request, res: Response, next: NextFunction) {

  const getAllTurnsHistory = {
    pageIndex: Joi.number().default(0).min(0).max(Number.MAX_VALUE),
    pageSize: Joi.number().default(null).min(1).max(Number.MAX_VALUE),
  };
  handleValidationError(getAllTurnsHistory, req.query, req, res, next);
};

export function createGameTurnValidator(req: Request, res: Response, next: NextFunction) {

  const createGameTurnResult = {
    cardsCount: Joi.number().required().min(Constants.MIN_CARD_NUMBER).max(Constants.MAX_CARD_NUMBER),
    numbersOnCards: Joi.array().items(Joi.number().required()),
    clicksOrder: Joi.array().items(Joi.number().required()).min(Constants.MIN_CARD_NUMBER).max(Constants.MAX_CARD_NUMBER),
    status: Joi.number().valid(TurnStatus.Fail, TurnStatus.Win).required()
  };
  handleValidationError(createGameTurnResult, req.body, req, res, next);
}

export function getGameTurnByIdValidator(req: Request, res: Response, next: NextFunction) {
  const getGameTurnById = { id: Joi.number().required() };
  handleValidationError(getGameTurnById, req.params, req, res, next);
}

function handleValidationError(schema: any, payload: any, req: Request, res: Response, next: NextFunction) {

  if (!schema)
    return next();

  const { error } = Joi.object(schema).validate(payload, { skipFunctions: true, abortEarly: false });

  if (error) {
    const badRequestError = new BadRequestError(`${getDetailedErrors(error)}`, req);
    return errorResult(badRequestError, req, res);
  }

  next();
}

function getDetailedErrors(error: Joi.ValidationError | undefined) {
  if (!error)
    return '';
  const { details } = error;
  if (!details)
    return '';
  const message = details.map(i => i.message).join(',');
  return message;
}
