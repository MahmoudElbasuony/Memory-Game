export const Queries = {
    Turns: {
        getAllTurns: 'SELECT id,status,cardsCount,finalClickedCards,displayedCardsNumbers,cardsToBeTested,creationDate FROM gen.Turns ',
        getAllTurnsWithPaging: 'SELECT id,status,cardsCount,finalClickedCards,displayedCardsNumbers,cardsToBeTested,creationDate FROM gen.Turns OFFSET $1 LIMIT $2',
        getTotalCount: 'SELECT COUNT(1) AS totalCount FROM gen.Turns;',
        getTurnById: 'SELECT id,status,cardsCount,finalClickedCards,displayedCardsNumbers,cardsToBeTested,creationDate FROM gen.Turns where id = $1',
        createTurn: 'INSERT INTO  gen.turns(status,cardsCount,finalClickedCards,displayedCardsNumbers,cardsToBeTested,creationDate)  values($1,$2,$3,$4,$5,$6) Returning id'
    }
}