import AddNewFriend from '@/core/user/services/AddNewFriend'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import SentFriendRequest from '@/core/user/services/SentFriendRequest'
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
        const sentFriendRequest = new SentFriendRequest(repositoryUser)

        const { data: mockUserCreated } = await createNewUser.exec(mockUser)
        const { data: mockFriendCreated } = await createNewUser.exec(mockFriend)

        const result = await sentFriendRequest.exec({
            userId: mockUserCreated?._id ?? '',
            friendId: mockFriendCreated?._id ?? '',
        })

        expect(result.error).toEqual(undefined)
        expect(result.friend).toBeDefined()
        expect(result.success).toEqual(true)

        const user = await repositoryUser.getUserById(mockUserCreated?._id ?? '')

        expect(user?.friendsRequests?.length).toEqual(1)
    })

    it('should not sent friend request if user not exists', async () => {
        const mockUser = {
            username: 'test',
            email: 'test@gmail.com',
            password: '123456',
        }

        const mockFriend = {
            _id: '123',
            username: 'test2',
            email: 'test2gmail.com',
            password: '123456',
        }

        const repositoryUser = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(repositoryUser)
        const sentFriendRequest = new SentFriendRequest(repositoryUser)

        const { data: mockUserCreated } = await createNewUser.exec(mockUser)

        const result = await sentFriendRequest.exec({
            userId: mockUserCreated?._id ?? '',
            friendId: mockFriend._id,
        })

        expect(result.error).toBeDefined()
        expect(result.friend).toBeUndefined()
        expect(result.success).toEqual(false)
    })

    it('should not sent friend request if friend not exists', async () => {
        const mockUser = {
            _id: '123',
            username: 'test',
            email: 'test@gmail.com',
            password: '123456',
        }

        const mockFriend = {
            username: 'test2',
            email: 'test2gmail.com',
            password: '123456',
        }

        const repositoryUser = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(repositoryUser)
        const sentFriendRequest = new SentFriendRequest(repositoryUser)

        const { data: mockFriendCreated } = await createNewUser.exec(mockFriend)

        const result = await sentFriendRequest.exec({
            userId: mockUser._id,
            friendId: mockFriendCreated?._id ?? '',
        })

        expect(result.error).toBeDefined()
        expect(result.friend).toBeUndefined()
        expect(result.success).toEqual(false)
    })

    it('shouldn t send a friend request if the user is already sent a request', async () => {
        const mockUser = {
            username: 'test',
            email: 'test@gmail.com',
            password: '123456',
        }

        const mockFriend = {
            username: 'test2',
            email: 'test2gmail.com',
            password: '123456',
        }

        const repositoryUser = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(repositoryUser)
        const sentFriendRequest = new SentFriendRequest(repositoryUser)

        const { data: mockUserCreated } = await createNewUser.exec(mockUser)
        const { data: mockFriendCreated } = await createNewUser.exec(mockFriend)

        await sentFriendRequest.exec({
            userId: mockUserCreated?._id ?? '',
            friendId: mockFriendCreated?._id ?? '',
        })

        const result = await sentFriendRequest.exec({
            userId: mockUserCreated?._id ?? '',
            friendId: mockFriendCreated?._id ?? '',
        })

        expect(result.error).toBeDefined()
        expect(result.friend).toBeUndefined()
        expect(result.success).toEqual(false)
    })

    it('shouldn t send a friend request if the user is already a friend', async () => {
        const mockUser = {
            username: 'test',
            email: 'test@gmail.com',
            password: '123456',
        }

        const mockFriend = {
            username: 'test2',
            email: 'test2gmail.com',
            password: '123456',
        }

        const repositoryUser = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(repositoryUser)
        const addNewFriend = new AddNewFriend(repositoryUser)
        const sentFriendRequest = new SentFriendRequest(repositoryUser)

        const { data: mockUserCreated } = await createNewUser.exec(mockUser)
        const { data: mockFriendCreated } = await createNewUser.exec(mockFriend)

        await addNewFriend.exec({
            userId: mockUserCreated?._id ?? '',
            friendId: mockFriendCreated?._id ?? '',
        })

        const result = await sentFriendRequest.exec({
            userId: mockUserCreated?._id ?? '',
            friendId: mockFriendCreated?._id ?? '',
        })

        expect(result.error).toBeDefined()
        expect(result.friend).toBeUndefined()
        expect(result.success).toEqual(false)
    })
})
