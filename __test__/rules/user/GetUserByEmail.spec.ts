import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import { GetUserByEmail } from '@/core/user/services/GetUserByEmail'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'
import { HttpStatusCode } from '@/types/HttpStatusCode'

describe('GetUserByEmail', () => {
    it('must return a user with valid email', async () => {
        const userRepositoryMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(userRepositoryMemory)
        const getUserByEmail = new GetUserByEmail(userRepositoryMemory)

        const userEmail = 'arthur@gmail.com'

        const user: CreateUserDto = { email: userEmail, username: 'username', password: 'password' }

        await createNewUser.exec(user)

        const response = await getUserByEmail.exec(userEmail)

        expect(response.status).toBe(HttpStatusCode.OK)
        expect(response.data).toBeTruthy()
        expect(response.data?._id).toBeDefined()
        expect(response.data?.email).toBe(userEmail)
    })

    it('must return null when email not exists', async () => {
        const userRepositoryMemory = new RepositoryUserMemory()
        const getUserByEmail = new GetUserByEmail(userRepositoryMemory)

        const userEmail = 'blabla@gmail.com'

        const result = await getUserByEmail.exec(userEmail)

        expect(result.status).toBe(HttpStatusCode.NOT_FOUND)
        expect(result.data).toBeNull()
        expect(result.message).toBe('User not found!')
    })
})
