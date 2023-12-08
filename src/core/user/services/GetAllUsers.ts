import UseCase from '@/core/shared/UseCase'
import { UserRepository } from './repository'
import User from '../entity/User'

export class GetAllUsers implements UseCase<void, User[]> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec(): Promise<User[]> {
        const users = await this.userRepository.getAllUsers()
        return users
    }
}
