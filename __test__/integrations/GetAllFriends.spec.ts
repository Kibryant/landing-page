import AddNewFriend from '@/core/user/services/AddNewFriend'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import GetAllFriends from '@/core/user/services/GetAllFriends'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('Get All Friends', () => {
    it('should get all friends', async () => {
        const userRepository = new RepositoryUserMemory()
        const addNewFriend = new AddNewFriend(userRepository)
        const getAllFriends = new GetAllFriends(userRepository)
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

        const friends = await getAllFriends.exec(user?._id ?? '')

        expect(friends).toBeTruthy()
        expect(friends?.length).toEqual(3)
        expect(friends?.[0].username).toEqual('Friend name 1')
        expect(friends?.[1].username).toEqual('Friend name 2')
        expect(friends?.[2].username).toEqual('Friend name 3')
    })

    it('should return null if user not found', async () => {
        const userRepository = new RepositoryUserMemory()
        const getAllFriends = new GetAllFriends(userRepository)
        const friends = await getAllFriends.exec('any_id')
        expect(friends).toBeNull()
    })
})
