/* eslint-disable prettier/prettier */
import UseCase from '@/core/shared/UseCase'
import { FriendOperationResult } from '@/types/res/FriendOperation'
import { UserRepository } from './repository'

interface Input {
    userId: string
    friendId: string
}

export default class SentFriendRequest implements UseCase<Input, Promise<FriendOperationResult>> {
    constructor(private repositoryUser: UserRepository) { }
    async exec({ userId, friendId }: Input): Promise<FriendOperationResult> {
        const result = await this.repositoryUser.sentFriendRequest(userId, friendId)

        return result
    }
}
