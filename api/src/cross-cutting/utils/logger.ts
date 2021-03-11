declare const global: any;
const config = require('../../config/config.json');
import winston from "winston";
import path from "path";
import { isDevelopment } from "./appUtility";
const loggingDirPath = process.env.LOGGING_FOLDER_PATH || config.logging.dir;
const loggingFolderAbsoluteFolder = path.isAbsolute(loggingDirPath) ?
                                    loggingDirPath :
                                    path.resolve(global.appRoot, loggingDirPath);

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: "white",
    debug: "green",
    info: "green",
    warn: "yellow",
    error: "red",
    fatal: "red",
  },
};

const dev_formatter = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;

    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
      }`;
  })
);
const prod_formatter = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
      }`;
  })
);

winston.addColors(customLevels.colors);

const prodTransport = new winston.transports.File({
  dirname: path.resolve(loggingFolderAbsoluteFolder),
  filename: "error.log",
  level: "error",
  format: prod_formatter,
});

const devTransport = new winston.transports.Console({
  format: dev_formatter,
});

const logger = winston.createLogger({
  level: isDevelopment() ? "trace" : "error",
  levels: customLevels.levels,
  transports: [isDevelopment() ? devTransport : prodTransport],
});

export const appLogger = {

  log(level: string, msg: string, data?: any) {
    logger.log(level, msg, data);
  },

  trace(msg: string, meta?: any) {
    logger.log("trace", msg, meta);
  },

  debug(msg: string, meta?: any) {
    logger.debug(msg, meta);
  },

  info(msg: string, meta?: any) {
    logger.info(msg, meta);
  },

  warn(msg: string, meta?: any) {
    logger.warn(msg, meta);
  },

  error(msg: string, meta?: any) {
    logger.error(msg, meta);
  },

  fatal(msg: string, meta?: any) {
    logger.log("fatal", msg, meta);
  },
};
