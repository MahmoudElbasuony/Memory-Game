#!/usr/bin/env node

/**
 * Module dependencies.
 */
declare const global : any;
global.appRoot = __dirname;
const config = require('./config/config.json');
import dotenv from "dotenv";
dotenv.config();
import {app} from "./app";
import http from "http";
import { appLogger as logger } from './cross-cutting/utils/logger';
import { handleError, isTrustedError } from "./cross-cutting/error/errorHandler";



/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || config.http.port);
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            logger.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            logger.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + (addr || {}).port;
    logger.debug(bind);
}

process.on("uncaughtException", (e: Error) => {
    handleError(e);
    if (!isTrustedError(e)) {
        process.exit();
    }
});

process.on("unhandledRejection", (reason, promise) => {
    throw reason;
});
