import NewMessageDto from '@/core/message/dtos/NewMessageDto'
import UseCase from '@/core/shared/UseCase'
import { UserRepository } from './repository'
import type MessageOperationResult from '@/types/res/MessageOperation'
import Message from '@/core/message/entity/Message'

export default class SentMessageToAnotherUser
    implements UseCase<NewMessageDto, Promise<MessageOperationResult<Message>>>
{
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec({ senderId, content, receiverId }: NewMessageDto): Promise<MessageOperationResult<Message>> {
        const { success, error, message } = await this.userRepository.sentMessageToAnotherUser(
            senderId,
            receiverId,
            content,
        )

        return {
            success,
            error,
            message,
        }
    }
}
