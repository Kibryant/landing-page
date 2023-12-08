import AddNewFriend from '@/core/user/services/AddNewFriend'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('AddNewFriend', () => {
    it('should add new friend', async () => {
        const mockUser = {
            username: 'test',
            email: 'test@gmail.com',
            password: '123456',
        }

        const mockFriend = {
            username: 'test2',
            email: 'test2@gmail.com',
            password: '123456',
        }

        const repositoryUser = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(repositoryUser)
        const addNewFriend = new AddNewFriend(repositoryUser)

        const { data: mockUserCreated } = await createNewUser.exec(mockUser)
        const { data: mockFriendCreated } = await createNewUser.exec(mockFriend)

        const result = await addNewFriend.exec({
            userId: mockUserCreated?._id ?? '',
            friendId: mockFriendCreated?._id ?? '',
        })

        expect(result.error).toEqual(undefined)
        expect(result.friend).toBeDefined()
        expect(result.success).toEqual(true)

        const user = await repositoryUser.getUserById(mockUserCreated?._id ?? '')

        expect(user?.friends?.length).toEqual(1)
    })
})
