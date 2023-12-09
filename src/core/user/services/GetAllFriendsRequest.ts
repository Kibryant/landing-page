import UseCase from '@/core/shared/UseCase'
import { UserFriend } from '../entity/User'
import { UserRepository } from './repository'

export default class GetAllFriendsRequest implements UseCase<string, Promise<UserFriend[] | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private readonly userRepository: UserRepository) { }
    async exec(userId: string): Promise<UserFriend[] | null> {
        const userFriends = await this.userRepository.getAllFriendsRequest(userId)

        if (!userFriends) {
            return null
        }

        return userFriends
    }
}
