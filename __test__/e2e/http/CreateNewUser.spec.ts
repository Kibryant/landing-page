import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import createNewUser from '@/lib/createNewUser/createNewUser'
import fetchUsers from '@/lib/fetchUsers/fetchUsers'
import { server } from '@/mocks/server'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { rest } from 'msw'

describe('CreateNewUser', () => {
    it('should crete new user', async () => {
        const user: CreateUserDto = {
            email: 'arthur@gmail.com',
            password: '123456',
            username: 'arthur',
        }

        server.use(
            rest.post('/api/users', async (req, res, ctx) => {
                return res(
                    ctx.status(HttpStatusCode.CREATED),
                    ctx.json({
                        id: '1',
                        ...user,
                    }),
                )
            }),
        )

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(user),
        })

        const newUser = await response.json()
        expect(newUser).toEqual({
            id: '1',
            ...user,
        })
    })

    it('should return error', async () => {
        const user = {
            email: 'arthur@gmail.com',
            password: '123456',
            username: 'arthur',
        }
        server.use(
            rest.post('/api/users', async (req, res, ctx) => {
                return res(ctx.status(HttpStatusCode.BAD_REQUEST))
            }),
        )
        expect.assertions(1)
        try {
            await createNewUser(user)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
                expect(error.message).toEqual('Error creating new user')
            }
        }
    })
    it('should return the correct number of user', async () => {
        const usersArray = await fetchUsers()
        expect(usersArray.length).toBe(2)
    })

    // it('should return an empty array with an error', async () => {
    //     server.use(http.get('/api/users', ({ request }) => { }))
    //     const todosArray = await fetchUsers()
    //     expect(todosArray.length).toBe(0)
    // })

    it('should return error 404', async () => {
        server.use(
            rest.get('/api/users', (req, res, ctx) => {
                return res(ctx.status(HttpStatusCode.NOT_FOUND))
            }),
        )
        const usersArray = await fetchUsers()
        expect(usersArray.length).toBe(0)
    })

    it.todo('Must created new user')
    it.todo('Must not create new user if email already exists')
})
