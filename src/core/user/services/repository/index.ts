import { UserProps } from '@/types/UserProps'
import UserModel from '../../models/User'

export class UserRepository {
    async findByEmail(email: string) {
        return UserModel.findOne({ email })
    }

    async createNewUser(user: UserProps) {
        return UserModel.create({ user })
    }

    async updateUser(userId: string, updatedFields: Record<string, any>) {
        return UserModel.findByIdAndUpdate(userId, updatedFields, { new: true })
    }
}
