/* eslint-disable prettier/prettier */
import UseCases from '@/core/shared/UseCases'
import User from '../entity/User'
import { UserRepository } from './repository'

type userId = string

export default class GetAllFriends implements UseCases<userId, Promise<null | User[] | []>> {
    constructor(private userRepository: UserRepository) { }
    async exec(userId: userId): Promise<null | User[] | []> {
        const user = await this.userRepository.getUserById(userId)

        if (!user) return null

        return user.friends || []
    }
}
