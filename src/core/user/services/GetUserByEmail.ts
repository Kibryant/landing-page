import UseCase from '@/core/shared/UseCase'
import { UserRepository } from './repository'
import { Response } from '@/types/class/Response'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import User from '../entity/User'

export class GetUserByEmail implements UseCase<string, Promise<Response<User | null>>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec(email: string): Promise<Response<User | null>> {
        const user = await this.userRepository.getUserByEmail(email)

        if (!user) {
            return new Response(null, 'User not found!', HttpStatusCode.NOT_FOUND)
        }

        return new Response(user, 'User founded!', HttpStatusCode.OK)
    }
}
