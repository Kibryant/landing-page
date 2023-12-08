import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import GetUserById from '@/core/user/services/GetUserById'
import SentMessageToAnotherUser from '@/core/user/services/SentMessageToAnotherUser'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('SentMessageToAnotherUser', () => {
    it('should sent a message to another user', async () => {
        const userRepository = new RepositoryUserMemory()
        const sentMessageToAnotherUser = new SentMessageToAnotherUser(userRepository)
        const createNewUser = new CreateNewUser(userRepository)
        const getUserById = new GetUserById(userRepository)

        const { data: sentUser } = await createNewUser.exec({
            username: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })

        const { data: receiverUser } = await createNewUser.exec({
            username: 'Jane Doe',
            email: 'janedoe@gmail.com',
            password: '123456',
        })

        const result = await sentMessageToAnotherUser.exec({
            senderId: sentUser?._id ?? '',
            receiverId: receiverUser?._id ?? '',
            content: 'Hello World',
        })

        expect(result.error).toBeUndefined()
        expect(result.success).toBeTruthy()
        expect(result.message).toBeTruthy()
        expect(result.message?.content).toBe('Hello World')

        const { data: sentUserWithMessages } = await getUserById.exec(sentUser?._id ?? '')
        const { data: receiverUserWithMessages } = await getUserById.exec(receiverUser?._id ?? '')

        expect(sentUserWithMessages?.sentMessages).toHaveLength(1)
        expect(receiverUserWithMessages?.receivedMessages).toHaveLength(1)
    })
})
