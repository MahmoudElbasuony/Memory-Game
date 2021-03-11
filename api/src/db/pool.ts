import { Pool } from "pg";
const config = require('../config/config.json');
import { appLogger as logger } from "../cross-cutting/utils/logger";
const db_opts = {
    user: process.env.DATABASE_USERNAME || config.db.user,
    host: process.env.DATABASE_HOST || config.db.host,
    database: process.env.DATABASE_NAME || config.db.database,
    password: process.env.DATABASE_PASSWORD || config.db.password,
    port: process.env.DATABASE_PORT || config.db.post,
    idleTimeoutMillis: process.env.DATABASE_IDLETIMEOUT_MILISECOND || config.db.idleTimeoutMillis,
    connectionTimeoutMillis: process.env.DATABASE_CONNECTION_TIMEOUT || config.db.connectionTimeoutMillis,
};

const pool = new Pool(db_opts);

pool.on('connect', () => {
    logger.info("database is connect");
});


pool.on('remove', () => {
    logger.info("database connection removed");
});

pool.on('error', (err, client) => {
    logger.error('Unexpected error on idle client', err)
    process.exit(-1)
});

process.on("beforeExit", (_) => {
    pool.end();
});

export default pool;