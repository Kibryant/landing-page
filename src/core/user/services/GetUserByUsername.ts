import UseCases from '@/core/shared/UseCases'
import { UserRepository } from './repository'
import { Response } from '@/types/class/Response'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import User from '../entity/User'

export class GetUserByUsername implements UseCases<string, Promise<Response<User | null>>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec(username: string): Promise<Response<User | null>> {
        const user = await this.userRepository.getUserByUsername(username)

        if (!user) {
            return new Response(null, 'User not found!', HttpStatusCode.NOT_FOUND)
        }

        return new Response(user, 'User founded!', HttpStatusCode.OK)
    }
}
