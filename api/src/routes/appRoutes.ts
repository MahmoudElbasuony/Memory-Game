import { Express, Router } from "express";
import { registerGameBoardRoutes } from "./gameBoardRoutes";

const appRouter = Router();

export function registerRoutes(app: Express) {
  registerGameBoardRoutes(appRouter);
  return appRouter;
}
