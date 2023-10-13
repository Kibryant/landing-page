import User from '@/core/user/models/User'
import { UserRepository } from '@/core/user/services/repository'
import { randomUUID } from 'node:crypto'

export default class RepositoryUserMemory implements UserRepository {
    private readonly users: User[] = []

    async getUserByEmail(email: string): Promise<User | null> {
        const user = this.users.find((user) => user.email === email)
        return user ?? null
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = this.users.find((user) => user.username === username)
        return user ?? null
    }

    async createNewUser(user: User): Promise<User> {
        const newUser = { ...user, id: '1' }
        this.users.push(newUser)
        return newUser
    }

    updateUser(userId: string, updatedFields: Record<string, any>): Promise<User | null> {
        throw new Error('Method not implemented.')
    }
}
