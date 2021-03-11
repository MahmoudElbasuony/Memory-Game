

declare const global: any;
global.appRoot = __dirname;
import express from "express";
import { errorResult } from './cross-cutting/error/apiErrors';
import { appLogger as logger } from "./cross-cutting/utils/logger";
import { registerRoutes } from "./routes/appRoutes";
import { NextFunction, Request, Response } from 'express';
import cors from "cors";
import { initSwagger } from "./swagger/swagger";
export const app = express();
initSwagger(app);
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => { logger.trace(`${req.method} : ${req.path}`, req.body); next(); });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", registerRoutes(app));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => errorResult(err, req, res));
module.exports = app;

