import { getRandomUUID } from '@/utils/getRandomUUID'

export default abstract class Entity {
    protected _id: string

    constructor(id?: string) {
        this._id = id ?? getRandomUUID()
    }

    get id(): string {
        return this._id
    }
}
