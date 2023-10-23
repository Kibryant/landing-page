import { UserRepository } from '@/core/user/services/repository'
import UserModel from '../../model/user/User'
import { UserProps } from '@/types/UserProps'
import type User from '@/core/user/models/User'

// Define a set of fields that can be updated in a user profile
interface UpdateFieldsProps {
    email?: string
    username?: string
    password?: string
}

// Create a class that extends the UserRepository
export class RepositoryUserMongo extends UserRepository {
    // Retrieve a user by their email
    async getUserByEmail(email: string): Promise<User | null> {
        try {
            return (await UserModel.findOne({ email })) ?? null
        } catch (error) {
            throw new Error('Error fetching user by email: ' + error)
        }
    }

    // Retrieve a user by their username
    async getUserByUsername(username: string): Promise<User | null> {
        try {
            return (await UserModel.findOne({ username })) ?? null
        } catch (error) {
            throw new Error('Error fetching user by username: ' + error)
        }
    }

    // Create a new user
    async createNewUser({ email, password, username, tasks }: User): Promise<UserProps> {
        try {
            const newUser: UserProps = new UserModel({
                email,
                username,
                password,
                tasks,
            })

            await newUser.save()

            return newUser
        } catch (error) {
            throw new Error('Error creating a new user: ' + error)
        }
    }

    // Update an existing user's profile
    async updateUser(userId: string, updatedFields: UpdateFieldsProps): Promise<User | null> {
        try {
            return (await UserModel.findByIdAndUpdate(userId, updatedFields, { new: true })) ?? null
        } catch (error) {
            throw new Error('Error updating user: ' + error)
        }
    }
}
