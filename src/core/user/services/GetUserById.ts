import UseCase from '@/core/shared/UseCase'
import User from '../entity/User'
import { UserRepository } from './repository'
import { Response } from '@/types/class/Response'

type userId = string

export default class GetUserById implements UseCase<userId, Promise<Response<User | null>>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec(userId: string): Promise<Response<User | null>> {
        const user = await this.userRepository.getUserById(userId)

        if (!user) {
            return new Response(null, 'User not found', 404)
        }

        return new Response(user, 'User found', 200)
    }
}
