import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import GetUserById from '@/core/user/services/GetUserById'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'
import { HttpStatusCode } from '@/types/HttpStatusCode'

describe('GetUserById', () => {
    it('should return user', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(repositoryUserMemory)
        const getUserById = new GetUserById(repositoryUserMemory)

        const { data } = await createNewUser.exec({
            username: 'any_user',
            email: 'any_email',
            password: 'any_password',
        })

        const { data: user, message, status } = await getUserById.exec(data?._id ?? '')

        expect(user).toBeDefined()
        expect(user?.username).toBe('any_user')
        expect(user?.email).toBe('any_email')
        expect(user?.password).toBe('any_password')
        expect(user?._id).toBeTruthy()
        expect(message).toBe('User found')
        expect(status).toBe(HttpStatusCode.OK)
    })

    it('should return null when user not found', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const getUserById = new GetUserById(repositoryUserMemory)

        const { data, status, message } = await getUserById.exec('any_id')

        expect(data).toBeNull()
        expect(status).toBe(HttpStatusCode.NOT_FOUND)
        expect(message).toBe('User not found')
    })
})
