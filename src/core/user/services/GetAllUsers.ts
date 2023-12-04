import UseCases from '@/core/shared/UseCases'
import { UserRepository } from './repository'
import User from '../entity/User'

export class GetAllUsers implements UseCases<void, Promise<User[] | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec(): Promise<User[] | null> {
        const users = await this.userRepository.getAllUsers()

        if (!users) {
            return null
        }

        return users
    }
}
