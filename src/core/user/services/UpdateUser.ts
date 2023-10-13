import UseCases from '@/core/shared/UseCases'
import { UserRepository } from './repository'
import { Response } from '@/types/class/Response'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import User from '../models/User'

interface UpdateUserProps {
    userId: string
    updateFields: {
        email?: string
        username?: string
        password?: string
    }
}

export class UpdateUser implements UseCases<UpdateUserProps, Promise<Response<User | null>>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec({ userId, updateFields }: UpdateUserProps): Promise<Response<User | null>> {
        const updatedUser = await this.userRepository.updateUser(userId, updateFields)

        if (!updatedUser) {
            return new Response(null, 'User not exits', HttpStatusCode.NOT_FOUND)
        }

        return new Response(updatedUser, 'User updated!', HttpStatusCode.OK)
    }
}
