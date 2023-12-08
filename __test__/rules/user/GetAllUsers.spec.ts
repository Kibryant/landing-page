import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import { GetAllUsers } from '@/core/user/services/GetAllUsers'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('GetAllUsers', () => {
    it('should return all users', async () => {
        const userRepository = new RepositoryUserMemory()
        const getAllUsers = new GetAllUsers(userRepository)
        const createNewUser = new CreateNewUser(userRepository)

        await createNewUser.exec({
            username: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })

        const users = await getAllUsers.exec()
        expect(users).toBeDefined()
        expect(users?.length).toBe(1)
        expect(users?.[0].username).toBe('John Doe')
        expect(users?.[0].email).toBe('johndoe@gmail.com')
        expect(users?.[0].password).toBe('123456')
    })

    it('should return a empty array if no users are found', async () => {
        const userRepository = new RepositoryUserMemory()
        const getAllUsers = new GetAllUsers(userRepository)

        const users = await getAllUsers.exec()
        expect(users).toStrictEqual([])
        expect(users?.length).toBe(0)
    })
})
