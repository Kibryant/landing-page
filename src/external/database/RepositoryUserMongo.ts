import { UserRepository } from '@/core/user/services/repository'
import UserModel from './model/User'
import { UserProps } from '@/types/UserProps'
import type User from '@/core/user/models/User'

export class MongooseUserRepository extends UserRepository {
    async getUserByEmail(email: string) {
        return (await UserModel.findOne({ email })) ?? null
    }

    async getUserByUsername(username: string) {
        return await UserModel.findOne({ username })
    }

    async createNewUser({ email, password, username }: User) {
        const newUser: UserProps = new UserModel({
            email,
            username,
            password,
            tasks: [],
        })

        await newUser.save()

        return newUser
    }

    async updateUser(userId: string, updatedFields: Record<string, any>) {
        return await UserModel.findByIdAndUpdate(userId, updatedFields, { new: true })
    }
}
