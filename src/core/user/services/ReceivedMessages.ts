import Message from '@/core/message/entity/Message'
import { UserRepository } from './repository'
import UseCase from '@/core/shared/UseCase'
import MessageOperationResult from '@/types/res/MessageOperation'

export default class ReceivedMessages implements UseCase<string, Promise<MessageOperationResult<Message[]>>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }

    async exec(userId: string): Promise<MessageOperationResult<Message[]>> {
        const { success, message, error } = await this.userRepository.receivedMessages(userId)

        return {
            success,
            message,
            error,
        }
    }
}
