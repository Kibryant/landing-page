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
            senderId: sentUser?._id ?? '',
            receiverId: receivedUser?._id ?? '',
            content: 'anycontent',
        })

        const sentAnotherMessage = await sentMessageToAnotherUser.exec({
            senderId: sentUser?._id ?? '',
            receiverId: receivedUser?._id ?? '',
            content: 'anothercontent',
        })

        const { success, message, error } = await receivedMessages.exec(receivedUser?._id ?? '')

        expect(sentMessage).toBeTruthy()
        expect(sentAnotherMessage).toBeTruthy()
        expect(success).toBeTruthy()
        expect(message).toBeDefined()
        expect(error).toBeUndefined()
    })

    it('should not be defined if user not exists', async () => {
        const userRepository = new RepositoryUserMemory()
        const receivedMessages = new ReceivedMessages(userRepository)

        const { success, message, error } = await receivedMessages.exec('anyid')

        expect(success).toBeFalsy()
        expect(message).toBeUndefined()
        expect(error).toBeDefined()
    })
})
