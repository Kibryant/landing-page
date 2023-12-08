/* eslint-disable prettier/prettier */
import UseCase from '@/core/shared/UseCase'
import { UserRepository } from './repository'
import { FriendOperationResult } from '@/types/res/FriendOperation'

interface Input {
    userId: string
    friendId: string
}

export default class AddNewFriend implements UseCase<Input, Promise<FriendOperationResult>> {
    constructor(private userRepository: UserRepository) { }
    async exec(input: Input): Promise<FriendOperationResult> {
        const { userId, friendId } = input

        const result = await this.userRepository.addNewFriend(userId, friendId)

        return result
    }
}
