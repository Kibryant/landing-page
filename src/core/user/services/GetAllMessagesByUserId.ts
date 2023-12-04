import UseCases from '@/core/shared/UseCases'
import { UserRepository } from './repository'
import Message from '@/core/messages/entity/Message'

export default class GetAllMessagesByUserId implements UseCases<string, Promise<Message[] | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec(userId: string): Promise<Message[] | null> {
        const user = await this.userRepository.getUserById(userId)

        if (!user) {
            return null
        }

        return user?.receivedMessages ?? null
    }
}
