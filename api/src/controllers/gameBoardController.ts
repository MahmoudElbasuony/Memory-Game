import { NextFunction, Request, Response } from "express";
import { getRandomInt } from '../cross-cutting/utils/appUtility';
import { Constants } from '../cross-cutting/constants';
import { InternalError } from '../cross-cutting/error/apiErrors';
import { GameBoardService } from '../services/gameBoardService';


export const GameBoardController = (gameBoardService: GameBoardService) => {

  if (!gameBoardService) throw new Error('Game service required');

  return {

    getCardsRandomNumbers(req: Request, res: Response, next: NextFunction) {
      const { cardsNumber }: any = req.query;
      try {
        const randomNumbers: Set<number> = new Set();
        for (let i = 0; randomNumbers.size < parseInt(cardsNumber); i++) {
          const randomNumber = getRandomInt(Constants.MAX_RANDOM_MIN_RANGE, Constants.MAX_RANDOM_MAX_RANGE);
          randomNumbers.add(randomNumber);
        }
        res.status(200);
        res.json(Array.from(randomNumbers));
      } catch (e) {
        next(new InternalError(e.message, req, e));
      }
    },

    async createGameTurnResult(req: Request, res: Response, next: NextFunction) {
      const { status, cardsCount, cardsToBeTested, finalClickedCards, displayedCardsNumbers }: any = req.body;
      try {
        const newTurn = await gameBoardService.createGameTurn(status, cardsCount, cardsToBeTested, finalClickedCards, displayedCardsNumbers);
        res.status(201);
        res.json(newTurn);
      } catch (e) {
        next(new InternalError(e.message, req, e));
      }
    },

    async getAllGameTurnsHistory(req: Request, res: Response, next: NextFunction) {
      const pageIndex: any = req.query["pageIndex"] || 0;
      const pageSize: any = req.query["pageSize"];
      try {
        const turns = await gameBoardService.getAllTurns(pageIndex, pageSize);
        res.status(200);
        res.json(turns);
      } catch (e) {
        next(new InternalError(e.message, req, e));
      }
    },

    async getGameTurnById(req: Request, res: Response, next: NextFunction) {
      const turnId: any = req.params.id;
      try {
        const turn = await gameBoardService.GetTurnById(turnId);
        res.status(200);
        res.json(turn);
      } catch (e) {
        next(new InternalError(e.message, req, e));
      }
    },
  }

};
