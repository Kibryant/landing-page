import UseCase from '@/core/shared/UseCase'
import { UserRepository } from './repository'
import MessageOperationResult from '@/types/res/MessageOperation'

export default class GetAllMessagesByUserId implements UseCase<string, Promise<MessageOperationResult>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec(userId: string): Promise<MessageOperationResult> {
        const { success, message, error } = await this.userRepository.getAllMessagesByUserId(userId)

        return {
            success,
            message,
            error,
        }
    }
}
