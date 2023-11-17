import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import GetUserById from '@/core/user/services/GetUserById'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('GetUserById', () => {
    test('should return user', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(repositoryUserMemory)
        const getUserById = new GetUserById(repositoryUserMemory)

        const { data } = await createNewUser.exec({
            username: 'any_user',
            email: 'any_email',
            password: 'any_password',
        })

        const user = await getUserById.exec(data?.id ?? '')

        expect(user).toBeDefined()
    })
})
