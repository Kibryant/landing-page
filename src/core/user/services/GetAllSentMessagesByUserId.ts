import UseCase from '@/core/shared/UseCase'
import { UserRepository } from './repository'
import MessageOperationResult from '@/types/res/MessageOperation'
import Message from '@/core/message/entity/Message'

export default class GetAllSentMessagesByUserId implements UseCase<string, Promise<MessageOperationResult<Message[]>>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec(userId: string): Promise<MessageOperationResult<Message[]>> {
        const { success, message, error } = await this.userRepository.getAllSentMessagesByUserId(userId)

        return {
            success,
            message,
            error,
        }
    }
}
