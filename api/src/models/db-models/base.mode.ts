export class BaseEntity<TKey>{
    public id: TKey;
    public creationDate: string;
    constructor(id: TKey) {
        this.id = id;
        this.creationDate = (new Date()).toUTCString();
    }
}