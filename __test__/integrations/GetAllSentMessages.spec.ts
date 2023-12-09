import AddNewFriend from '@/core/user/services/AddNewFriend'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import GetAllSentMessagesByUserId from '@/core/user/services/GetAllSentMessagesByUserId'
import SentMessageToAnotherUser from '@/core/user/services/SentMessageToAnotherUser'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('Get All Sent Messages', () => {
    it('should get all sent messages', async () => {
        const userRepository = new RepositoryUserMemory()
        const addNewFriend = new AddNewFriend(userRepository)
        const sentMessageToAnotherUser = new SentMessageToAnotherUser(userRepository)
        const getAllSentMessages = new GetAllSentMessagesByUserId(userRepository)
        const createNewUser = new CreateNewUser(userRepository)

        const { data: user } = await createNewUser.exec({
            username: 'User name',
            email: 'user@gmail.com',
            password: '12345678',
        })

        const friend1 = await createNewUser.exec({
            username: 'Friend name 1',
            email: 'friend1@gmail.com',
            password: '12345678',
        })

        const friend2 = await createNewUser.exec({
            username: 'Friend name 2',
            email: 'friend2@gmail.com',
            password: '12345678',
        })

        const friend3 = await createNewUser.exec({
            username: 'Friend name 3',
            email: 'friend3@gmail.com',
            password: '12345678',
        })

        await addNewFriend.exec({
            userId: user?._id ?? '',
            friendId: friend1.data?._id ?? '',
        })

        await addNewFriend.exec({
            userId: user?._id ?? '',
            friendId: friend2.data?._id ?? '',
        })

        await addNewFriend.exec({
            userId: user?._id ?? '',
            friendId: friend3.data?._id ?? '',
        })

        await sentMessageToAnotherUser.exec({
            senderId: user?._id ?? '',
            receiverId: friend1.data?._id ?? '',
            content: 'any_content',
        })

        await sentMessageToAnotherUser.exec({
            senderId: user?._id ?? '',
            receiverId: friend2.data?._id ?? '',
            content: 'any_content',
        })

        await sentMessageToAnotherUser.exec({
            senderId: user?._id ?? '',
            receiverId: friend3.data?._id ?? '',
            content: 'any_content',
        })

        const { message } = await getAllSentMessages.exec(user?._id ?? '')

        expect(message).toBeTruthy()
        expect(message?.length).toBe(3)
    })

    it('should return null when user not exists', async () => {
        const userRepository = new RepositoryUserMemory()
        const getAllSentMessages = new GetAllSentMessagesByUserId(userRepository)

        const { message, success, error } = await getAllSentMessages.exec('any_user_id')

        expect(message).toBeUndefined()
        expect(success).toBeFalsy()
        expect(error).toBeDefined()
    })
})
