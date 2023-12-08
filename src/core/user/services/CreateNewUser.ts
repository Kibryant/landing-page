import UseCase from '@/core/shared/UseCase'
import { UserRepository } from './repository'
import { Response } from '@/types/class/Response'
import User from '../entity/User'
import CreateUserDto from '../dtos/CreateUserDto'

export class CreateNewUser implements UseCase<User, Response<User | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }

    async exec({ email, username, password }: CreateUserDto): Promise<Response<User | null>> {
        const { data, message, status } = await this.userRepository.createNewUser({
            email,
            username,
            password,
        })

        return new Response(data, message, status)
    }
}
