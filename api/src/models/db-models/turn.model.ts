import { BaseEntity } from './base.mode';
export class Turn extends BaseEntity<number> {
    public cardsCount: number;
    public numbersOnCards: number[];
    public clicksOrder: number[];
    public status : TurnStatus;
    constructor(status:TurnStatus) {
        super(0);
        this.cardsCount = 0;
        this.numbersOnCards = [];
        this.clicksOrder = [];
        this.status = status;
    }

}

export enum TurnStatus{
    Fail = 0,
    Win = 1
}