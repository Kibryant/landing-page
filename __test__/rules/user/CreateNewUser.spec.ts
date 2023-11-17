import User from '@/core/user/models/User'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'
import { HttpStatusCode } from '@/types/HttpStatusCode'

describe('CreateNewUser', () => {
    it('Must created new user', async () => {
        const userRepositoryMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(userRepositoryMemory)

        const userToCreate: User = {
            id: '1',
            email: 'novousuario@example.com',
            username: 'novousuario',
            tasks: [],
            password: 'senhasegura',
        }

        const response = await createNewUser.exec(userToCreate)

        expect(response.status).toBe(HttpStatusCode.CREATED)
        expect(response.data).toEqual(userToCreate)
    })
})
