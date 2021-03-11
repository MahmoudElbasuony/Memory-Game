import { QueryResult } from 'pg';
import { Turn, TurnStatus } from '../models/db-models/turn.model';
import { Queries } from '../db/queries';

export class GameBoardService {

    constructor(private readonly _db: (queryText: string, queryParams: any[]) => Promise<QueryResult<any>>) {
        if (!this._db) throw new Error('Game repository required!');
    }

    public async getAllTurns(pageIndex: number = 0, pageSize?: number) {
        let turnsRows: Turn[] = [];
        if (pageSize) {
            turnsRows = await (await this._db(Queries.Turns.getAllTurnsWithPaging, [pageIndex * pageSize, pageSize])).rows;
        } else {
            turnsRows = await (await this._db(Queries.Turns.getAllTurns, [])).rows;
        }
        const { rows } = await this._db(Queries.Turns.getTotalCount, []);
        const result = {
            totalCount: +(rows[0]["totalcount"]),
            turns: turnsRows,
        };
        return result;
    };

    public async createGameTurn(status: TurnStatus, cardsCount: number, clicksOrder: number[], numbersOnCards: number[]) {
        const creationDate = (new Date()).toUTCString();
        const res = await this._db(Queries.Turns.createTurn, [status, cardsCount, clicksOrder.join(','), numbersOnCards.join(','), creationDate]);
        const newCreatedTurn = await this.GetTurnById(res.rows[0].id);
        return newCreatedTurn;
    };

    public async GetTurnById(turnId: number) {
        const { rows } = await this._db(Queries.Turns.getTurnById, [turnId]);
        return <Turn>((rows || [])[0]);
    }

}