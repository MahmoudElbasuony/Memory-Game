import { Router } from "express";
import { GameBoardController } from '../controllers/gameBoardController';
import { getCardsRandomNumbersValidator, createGameTurnValidator, getAllTurnsHistoryValidator, getGameTurnByIdValidator } from '../validations/gameBoardController.validator';
import { GameBoardService } from '../services/gameBoardService';
var queries = require('../db/queries');
import db from "../db/connection";


export function registerGameBoardRoutes(appRouter: Router): Router | void {
  const router = Router();
  appRouter.use("/gameboard", router);
  const gameBoardService = new GameBoardService(db);
  const gameBoardController = GameBoardController(gameBoardService);

  /**
 * @route GET /api/v1/gameboard/getCardsRandomNumbers?cardsNumber=
 * @param {number} cardsNumber.query.required - Cards Number To Generate Random Numbers For - eg: 3
 * @returns {object} 200 - An array of user info e.g [12,52,36]
 * @returns {Error}  error - Internal server error { error : errorDescription } | Bad Request { error : errorDescription }
 */
  router.get("/getCardsRandomNumbers", getCardsRandomNumbersValidator, gameBoardController.getCardsRandomNumbers);

  /**
* @route GET /api/v1/gameboard/getAllGameTurnsHistory?pageIndex=&pageSize=
* @param {number} pageIndex.query.optional - page Iindex 
* @param {number} pageSize.query.optional - page size 
* @returns {object} 200 - An array of all user turns [ { id, creationDate, status , cardsCount , clicksOrder,numbersOnCards } ]
* @returns {Error}  error - Internal server error { error : errorDescription } | Bad Request { error : errorDescription }
*/
  router.get("/getAllGameTurnsHistory", getAllTurnsHistoryValidator, gameBoardController.getAllGameTurnsHistory);

  /**
* @route GET /api/v1/gameboard/getGameTurnById/1
* @param {number} turnId.paras.required - turn id
* @returns {object} 200 - A user turn  { id ,creationDate, status , cardsCount , clicksOrder,numbersOnCards } 
* @returns {Error}  error - Internal server error { error : errorDescription } | Bad Request { error : errorDescription }
*/
  router.get("/getGameTurnById/:id", getGameTurnByIdValidator, gameBoardController.getGameTurnById);

  /**
 * @route POST /api/v1/gameboard/createGameTurnResult
 * @param {number} cardsCount.body.required - cards count
 * @param {Array} numbersOnCards.body.required - numbers displayed on cards
 * @param {Array} clicksOrder.body.required - clicked cards numbers in ascending order as user clicked
 * @param {number} status.body.required - status of the turn e.g 0 Fail | 1 Win
 * @returns {object} 201 - Game turn created
 * @returns {Error}  error - Internal server error { error : errorDescription } | Bad Request { error : errorDescription }
 */
  router.post("/createGameTurnResult", createGameTurnValidator, gameBoardController.createGameTurnResult);

  return router;
}
