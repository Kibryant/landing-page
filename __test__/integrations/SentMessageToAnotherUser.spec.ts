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

    it('should not sent a message to another user if sender not exists', async () => {
        const userRepository = new RepositoryUserMemory()
        const sentMessageToAnotherUser = new SentMessageToAnotherUser(userRepository)
        const createNewUser = new CreateNewUser(userRepository)

        const { data: receiverUser } = await createNewUser.exec({
            username: 'Jane Doe',
            email: 'janeDoegmail.com',
            password: '123456',
        })

        const result = await sentMessageToAnotherUser.exec({
            senderId: '123',
            receiverId: receiverUser?._id ?? '',
            content: 'Hello World',
        })

        expect(result.error).toBeTruthy()
        expect(result.success).toBeFalsy()
        expect(result.message).toBeUndefined()
    })

    it('should not to be able sent a message to another user if receiver not exists', async () => {
        const userRepository = new RepositoryUserMemory()
        const sentMessageToAnotherUser = new SentMessageToAnotherUser(userRepository)
        const createNewUser = new CreateNewUser(userRepository)

        const { data: sentUser } = await createNewUser.exec({
            username: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'johndoe',
        })

        const mockFriend = {
            _id: '1390812948901824124',
            username: 'blablbabla',
            email: 'blblabllblalblalbla@gmail.com',
            password: 'blablablabla',
        }

        const result = await sentMessageToAnotherUser.exec({
            senderId: sentUser?._id ?? '',
            receiverId: mockFriend._id,
            content: 'Hello World',
        })

        expect(result.success).toBeFalsy()
        expect(result.message).toBeUndefined()
        expect(result.error).toBe('Receiver not found')
    })
})
