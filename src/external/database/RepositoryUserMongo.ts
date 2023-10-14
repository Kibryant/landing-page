import { UserRepository } from '@/core/user/services/repository'
import UserModel from './model/user/User'
import { UserProps } from '@/types/UserProps'
import type User from '@/core/user/models/User'

interface UpdateFieldsProps {
    email?: string
    username?: string
    password?: string
}

export class MongooseUserRepository extends UserRepository {
    async getUserByEmail(email: string) {
        return (await UserModel.findOne({ email })) ?? null
    }

    async getUserByUsername(username: string) {
        return (await UserModel.findOne({ username })) ?? null
    }

    async createNewUser({ email, password, username, tasks }: User) {
        const newUser: UserProps = new UserModel({
            email,
            username,
            password,
            tasks,
        })

        await newUser.save()

        return newUser
    }

    async updateUser(userId: string, updatedFields: UpdateFieldsProps) {
        return await UserModel.findByIdAndUpdate(userId, updatedFields, { new: true })
    }
}
