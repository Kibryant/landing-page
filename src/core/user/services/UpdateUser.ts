import UseCases from '@/core/shared/UseCases'
import { UserRepository } from './repository'
import { Response } from '@/types/class/Response'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import User from '../models/User'
import UpdateUserDto from '../dtos/UpdateUserDto'

export class UpdateUser implements UseCases<UpdateUserDto, Promise<Response<User | null>>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec({ id: userId, email, password, username }: UpdateUserDto): Promise<Response<User | null>> {
        if (userId.length === 0) {
            return new Response(null, 'Id not provide!', HttpStatusCode.BAD_REQUEST)
        }

        const updatedFieldsUser: UpdateUserDto = {
            id: userId,
        }

        if (email) {
            updatedFieldsUser.email = email
        }

        if (username) {
            updatedFieldsUser.username = username
        }

        if (password) {
            updatedFieldsUser.password = password
        }

        const updatedUser = await this.userRepository.updateUser(userId, updatedFieldsUser)

        if (!updatedUser) {
            return new Response(null, 'User not exits', HttpStatusCode.NOT_FOUND)
        }

        return new Response(updatedUser, 'User updated!', HttpStatusCode.OK)
    }
}
