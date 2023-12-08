import { randomUUID } from 'crypto'

export default abstract class Entity {
    protected _id: string

    constructor(id?: string) {
        this._id = id ?? randomUUID()
    }

    get id(): string {
        return this._id
    }
}
