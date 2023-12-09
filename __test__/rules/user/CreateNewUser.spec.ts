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
            password: 'password',
        }

        const response = await createNewUser.exec(userToCreate)

        expect(response.status).toBe(HttpStatusCode.CREATED)
        expect(response.data).toEqual(expect.objectContaining(userToCreate))
        expect(response.data?._id).toBeDefined()
    })

    it('Must return error when email already exists', async () => {
        const userRepositoryMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(userRepositoryMemory)

        const userToCreate: CreateUserDto = {
            email: 'novousuario@example.com',
            username: 'novousuario',
            tasks: [],
            password: 'password',
            receivedMessages: [],
            sentMessages: [],
        }

        await createNewUser.exec(userToCreate)

        const response = await createNewUser.exec(userToCreate)

        expect(response.status).toBe(HttpStatusCode.CONFLICT)
        expect(response.data).toBeNull()
        expect(response.message).toBe('Email already exists')
    })

    it('Must return error when username already exists', async () => {
        const userRepositoryMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(userRepositoryMemory)

        const userToCreate3: CreateUserDto = {
            email: 'novonvonovnov@gmail.com',
            username: 'novousuario',
            password: 'password',
        }

        const userToCreate4: CreateUserDto = {
            email: 'dfjniofndiosndfonodsnfondsof@gmail.com',
            username: 'novousuario',
            password: 'password',
        }

        await createNewUser.exec(userToCreate4)
        const response = await createNewUser.exec(userToCreate3)
        console.log(response)

        expect(response.status).toBe(HttpStatusCode.CONFLICT)
        expect(response.data).toBeNull()
        expect(response.message).toBe('Username already exists')
    })

    it('Must return error when user not created', async () => {
        const userRepositoryMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(userRepositoryMemory)

        jest.spyOn(createNewUser, 'exec').mockImplementation(() => Promise.reject(new Error('Error creating user!')))

        const userToCreate4: CreateUserDto = {
            email: 'arthur@gmail.com',
            username: 'arthur',
            password: 'password',
        }

        let error: unknown
        try {
            await createNewUser.exec(userToCreate4)
        } catch (e) {
            error = e
        }

        expect(error).toBeDefined()
        expect(error).toBeTruthy()
    })

    it('Must return error when missing fields', async () => {
        const userRepositoryMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(userRepositoryMemory)

        const userToCreate4: CreateUserDto = {
            email: null as unknown as string,
            username: null as unknown as string,
            password: null as unknown as string,
        }

        const response = await createNewUser.exec(userToCreate4)

        expect(response.status).toBe(HttpStatusCode.BAD_REQUEST)
        expect(response.data).toBeNull()
        expect(response.message).toBe('Missing fields')
    })

    it('should return error when invalid email', async () => {
        const userRepositoryMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(userRepositoryMemory)

        const userToCreate4: CreateUserDto = {
            email: 'emailinvalido',
            username: 'arthur',
            password: 'password',
        }

        const response = await createNewUser.exec(userToCreate4)

        expect(response.status).toBe(HttpStatusCode.BAD_REQUEST)
        expect(response.data).toBeNull()
        expect(response.message).toBe('Invalid email')
    })
})
