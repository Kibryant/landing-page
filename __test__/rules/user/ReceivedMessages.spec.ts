import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import ReceivedMessages from '@/core/user/services/ReceivedMessages'
import SentMessageToAnotherUser from '@/core/user/services/SentMessageToAnotherUser'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('ReceivedMessages', () => {
    it('should be defined', async () => {
        const userRepository = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(userRepository)
        const sentMessageToAnotherUser = new SentMessageToAnotherUser(userRepository)
        const receivedMessages = new ReceivedMessages(userRepository)

        const { data: sentUser } = await createNewUser.exec({
            email: 'anyemail@gmail.com',
            username: 'anyusername',
            password: 'anypassword',
        })

        const { data: receivedUser } = await createNewUser.exec({
            email: 'received@gmail.com',
            username: 'receivedusername',
            password: 'receivedpassword',
        })

        const sentMessage = await sentMessageToAnotherUser.exec({
            senderId: sentUser?.id ?? '',
            receiverId: receivedUser?.id ?? '',
            content: 'anycontent',
        })

        const sentAnotherMessage = await sentMessageToAnotherUser.exec({
            senderId: sentUser?.id ?? '',
            receiverId: receivedUser?.id ?? '',
            content: 'anothercontent',
        })

        const receivedMessagesFromUser = await receivedMessages.exec(receivedUser?.id ?? '')

        expect(sentMessage).toBeTruthy()
        expect(sentAnotherMessage).toBeTruthy()
        expect(receivedMessagesFromUser?.length).toBe(2)
    })
})
