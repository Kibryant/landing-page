/* eslint-disable prettier/prettier */
import UseCase from '@/core/shared/UseCase'
import { UserFriend } from '../entity/User'
import { UserRepository } from './repository'

type userId = string

export default class GetAllFriends implements UseCase<userId, Promise<UserFriend[] | null>> {
    constructor(private userRepository: UserRepository) { }
    async exec(userId: userId): Promise<UserFriend[] | null> {
        const friends = await this.userRepository.getAllFriends(userId)

        if (!friends) return null

        return friends
    }
}
