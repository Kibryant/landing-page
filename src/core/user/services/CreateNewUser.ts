import UseCases from '@/core/shared/UseCases'
import { UserRepository } from './repository'
import { UserProps } from '@/types/UserProps'
import { Response } from '@/types/class/Response'
import { HttpStatusCode } from '@/types/HttpStatusCode'

export class CreateNewUser implements UseCases<UserProps, Response<UserProps | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec(user: UserProps): Promise<Response<UserProps | null>> {
        const userExists = await this.userRepository.findByEmail(user.email)

        if (userExists) {
            return new Response(null, 'This email exists! try another or sign in!', 400)
        }

        const newUser: UserProps = await this.userRepository.createNewUser(user)

        return new Response(newUser, 'User Created!', HttpStatusCode.CREATED)
    }
}
