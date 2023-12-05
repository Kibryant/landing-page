import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('SentFriendRequest', () => {
    it('should sent friend request', async () => {
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

        const { data: mockUserCreated } = await createNewUser.exec(mockUser)
        const { data: mockFriendCreated } = await createNewUser.exec(mockFriend)

        const result = await repositoryUser.sentFriendRequest(mockUserCreated?.id ?? '', mockFriendCreated?.id ?? '')

        expect(result.error).toEqual(undefined)
        expect(result.friend).toBeDefined()
        expect(result.success).toEqual(true)

        const user = await repositoryUser.getUserById(mockUserCreated?.id ?? '')

        expect(user?.friendsRequests?.length).toEqual(1)
    })
})
