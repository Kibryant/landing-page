import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'
import { HttpStatusCode } from '@/types/HttpStatusCode'

describe('CreateNewUser', () => {
    it('Must created new user', async () => {
        const userRepositoryMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(userRepositoryMemory)

        const userToCreate: CreateUserDto = {
            email: 'novousuario@example.com',
            username: 'novousuario',
            tasks: [],
            password: 'senhasegura',
            receivedMessages: [],
            sentMessages: [],
        }

        const response = await createNewUser.exec(userToCreate)

        expect(response.status).toBe(HttpStatusCode.CREATED)
        expect(response.data).toEqual(expect.objectContaining(userToCreate))
        expect(response.data?.id).toBeDefined()
    })

    it('Must return error when email already exists', async () => {
        const userRepositoryMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(userRepositoryMemory)

        const userToCreate: CreateUserDto = {
            email: 'novousuario@example.com',
            username: 'novousuario',
            tasks: [],
            password: 'senhasegura',
            receivedMessages: [],
            sentMessages: [],
        }

        await createNewUser.exec(userToCreate)

        const response = await createNewUser.exec(userToCreate)

        expect(response.status).toBe(HttpStatusCode.CONFLICT)
        expect(response.data).toBeNull()
        expect(response.message).toBe('This email exists! try another or sign in!')
    })
})
