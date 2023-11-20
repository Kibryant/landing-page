import UseCases from '@/core/shared/UseCases'
import User from '../entity/User'
import { UserRepository } from './repository'

type userId = string

export default class GetUserById implements UseCases<userId, Promise<User | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec(userId: string): Promise<User | null> {
        const user = await this.userRepository.getUserById(userId)

        if (!user) {
            return null
        }

        return user
    }
}
