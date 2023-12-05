import UseCases from '@/core/shared/UseCases'
import { UserRepository } from './repository'
import { Response } from '@/types/class/Response'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import User from '../entity/User'
import UpdateUserDto from '../dtos/UpdateUserDto'

export class UpdateUser implements UseCases<[string, UpdateUserDto], Promise<Response<User | null>>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec([userId, updatedFieldsUser]: [string, UpdateUserDto]): Promise<Response<User | null>> {
        const updatedUser = await this.userRepository.updateUser(userId, updatedFieldsUser)

        if (!updatedUser) {
            return new Response(null, 'User not exits', HttpStatusCode.NOT_FOUND)
        }

        return new Response(updatedUser, 'User updated!', HttpStatusCode.OK)
    }
}
