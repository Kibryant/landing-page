import User from '../../models/User'

export abstract class UserRepository {
    abstract getUserByEmail(email: string): Promise<User | null>
    abstract getUserByUsername(username: string): Promise<User | null>
    abstract createNewUser(user: User): Promise<User>
    abstract updateUser(userId: string, updatedFields: Record<string, any>): Promise<User | null>
}
