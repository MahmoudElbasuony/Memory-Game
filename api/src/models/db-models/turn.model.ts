import { BaseEntity } from './base.mode';
export class Turn extends BaseEntity<number> {
    public cardsCount: number;
    public displayedCardsNumbers: number[];
    public finalClickedCards: number[];
    public cardsToBeTested : number[];
    public status : TurnStatus;
    constructor(status:TurnStatus) {
        super(0);
        this.cardsCount = 0;
        this.finalClickedCards = [];
        this.displayedCardsNumbers = [];
        this.cardsToBeTested = [];
        this.status = status;
    }

}

export enum TurnStatus{
    Fail = 0,
    Win = 1
}