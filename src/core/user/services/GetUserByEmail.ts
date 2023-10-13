import UseCases from '@/core/shared/UseCases'
import { UserRepository } from './repository'
import { UserProps } from '@/types/UserProps'

export class GetUserByEmail implements UseCases<string, UserProps | null> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    exec(email: string): Promise<UserProps | null> {
        return this.userRepository.findByEmail(email)
    }
}
