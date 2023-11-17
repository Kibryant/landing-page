import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import { GetUserByUsername } from '@/core/user/services/GetUserByUsername'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('GetUserByUsername', () => {
    test('should return user', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(repositoryUserMemory)
        const getUserByUsername = new GetUserByUsername(repositoryUserMemory)
        const { data } = await createNewUser.exec({
            username: 'any_user',
            email: 'any_email',
            password: 'any_password',
        })
        const { data: user } = await getUserByUsername.exec(data?.username ?? '')
        expect(user?.username).toBeDefined()
    })

    test('should return user not found', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()

        const getUserByUsername = new GetUserByUsername(repositoryUserMemory)
        const { data } = await getUserByUsername.exec('any_username')
        expect(data).toBe(null)
    })
    test('should return username not provide', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const getUserByUsername = new GetUserByUsername(repositoryUserMemory)
        const { data } = await getUserByUsername.exec('')
        expect(data).toBe(null)
    })
})
