import UseCases from '@/core/shared/UseCases'
import { UserRepository } from './repository'
import { Response } from '@/types/class/Response'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import User from '../entity/User'
import CreateUserDto from '../dtos/CreateUserDto'

export class CreateNewUser implements UseCases<User, Response<User | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }

    async exec({ email, username, password }: CreateUserDto): Promise<Response<User | null>> {
        const userEmailExists = await this.userRepository.getUserByEmail(email)
        const userUsernameExists = await this.userRepository.getUserByUsername(username)

        if (userEmailExists) {
            return new Response(null, 'This email exists! try another or sign in!', HttpStatusCode.CONFLICT)
        }

        if (userUsernameExists) {
            return new Response(null, 'This username exists! try another or sign in!', HttpStatusCode.CONFLICT)
        }

        const newUser = await this.userRepository.createNewUser({
            email,
            username,
            password,
            tasks: [],
            sentMessages: [],
            receivedMessages: [],
        })

        if (!newUser) return new Response(null, 'Error creating user!', HttpStatusCode.INTERNAL_SERVER_ERROR)

        return new Response(newUser, 'User Created!', HttpStatusCode.CREATED)
    }
}
