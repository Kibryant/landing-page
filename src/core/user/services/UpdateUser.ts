import UseCase from '@/core/shared/UseCase'
import { UserRepository } from './repository'
import { Response } from '@/types/class/Response'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import User from '../entity/User'
import UpdateUserDto from '../dtos/UpdateUserDto'

type Input = [string, UpdateUserDto]

export class UpdateUser implements UseCase<Input, Promise<Response<User | null>>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec([userId, updatedFieldsUser]: Input): Promise<Response<User | null>> {
        if (!userId) {
            return new Response(null, 'Id not provide!', HttpStatusCode.BAD_REQUEST)
        }

        const updatedUser = await this.userRepository.updateUser(userId, updatedFieldsUser)

        if (!updatedUser) {
            return new Response(null, 'User not exits', HttpStatusCode.NOT_FOUND)
        }

        return new Response(updatedUser, 'User updated!', HttpStatusCode.OK)
    }
}
