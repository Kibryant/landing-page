import NewMessageDto from '@/core/messages/dtos/NewMessageDto'
import UseCases from '@/core/shared/UseCases'
import { UserRepository } from './repository'
import Message from '@/core/messages/entity/Message'

export default class SentMessageToAnotherUser implements UseCases<NewMessageDto, Promise<boolean>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }

    async exec({ senderId, receiverId, content }: NewMessageDto): Promise<boolean> {
        const sender = await this.userRepository.getUserById(senderId)

        if (!sender) {
            return false
        }

        const receiver = await this.userRepository.getUserById(receiverId)

        if (!receiver) {
            return false
        }

        const message = new Message({ content, senderId, receiverId, createdAt: new Date() })

        sender.sentMessages?.push(message)
        receiver.receivedMessages?.push(message)

        return true
    }
}
