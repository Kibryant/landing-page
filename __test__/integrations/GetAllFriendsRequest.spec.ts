import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import GetAllFriendsRequest from '@/core/user/services/GetAllFriendsRequest'
import SentFriendRequest from '@/core/user/services/SentFriendRequest'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('Get All Friends Request', () => {
    it('should get all friends request', async () => {
        const userRepository = new RepositoryUserMemory()
        const sentFriendRequest = new SentFriendRequest(userRepository)
        const getAllFriendsRequest = new GetAllFriendsRequest(userRepository)
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

        await sentFriendRequest.exec({
            userId: user?._id ?? '',
            friendId: friend1.data?._id ?? '',
        })

        await sentFriendRequest.exec({
            userId: user?._id ?? '',
            friendId: friend2.data?._id ?? '',
        })

        await sentFriendRequest.exec({
            userId: user?._id ?? '',
            friendId: friend3.data?._id ?? '',
        })

        const userFriendsRequest = await getAllFriendsRequest.exec(user?._id ?? '')

        expect(userFriendsRequest).toHaveLength(3)
    })

    it('should return  if user not found', async () => {
        const userRepository = new RepositoryUserMemory()
        const getAllFriendsRequest = new GetAllFriendsRequest(userRepository)
        const userFriendsRequest = await getAllFriendsRequest.exec('any_id')
        expect(userFriendsRequest).toBeNull()
    })
})
