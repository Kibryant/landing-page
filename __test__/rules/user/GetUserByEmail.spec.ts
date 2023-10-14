import { GetUserByEmail } from '@/core/user/services/GetUserByEmail'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'
import { HttpStatusCode } from '@/types/HttpStatusCode'

jest.mock('../../../src/external/memory/RepositoryUserMemory')

describe('CreateNewUser', () => {
    let userRepositoryMemory: RepositoryUserMemory
    let getUserByEmail: GetUserByEmail

    beforeEach(() => {
        userRepositoryMemory = new RepositoryUserMemory()
        getUserByEmail = new GetUserByEmail(userRepositoryMemory)
    })

    it('must return a user with valid email', async () => {
        const userEmail = 'email@example.com'
        const user = { email: userEmail, username: 'username', password: 'password' }

        userRepositoryMemory.getUserByEmail = jest.fn().mockResolvedValue(user)

        const response = await getUserByEmail.exec(userEmail)

        expect(response.status).toBe(HttpStatusCode.OK)
        expect(response.data).toEqual(user)
    })
})
