import UseCases from '@/core/shared/UseCases'
import { UserRepository } from './repository'
import { Response } from '@/types/class/Response'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import User from '../models/User'

export class CreateNewUser implements UseCases<User, Response<User | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }

    async exec({ email, username, password }: User): Promise<Response<User | null>> {
        const emailExists = await this.userRepository.getUserByEmail(email)
        const usernameExists = await this.userRepository.getUserByUsername(username)

        if (emailExists) {
            return new Response(null, 'This email exists! try another or sign in!', HttpStatusCode.CONFLICT)
        }

        if (usernameExists) {
            return new Response(null, 'This username exists! try another or sign in!', HttpStatusCode.CONFLICT)
        }

        const newUser: User = await this.userRepository.createNewUser({
            email,
            username,
            password,
            tasks: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        return new Response(newUser, 'User Created!', HttpStatusCode.CREATED)
    }
}
