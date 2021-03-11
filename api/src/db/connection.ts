
import pool from "./pool";
export default async function dbQuery(queryText: string, queryParams: any[]) {
    return await pool.query(queryText, queryParams);
}