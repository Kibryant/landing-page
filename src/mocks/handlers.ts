import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import { HttpStatusCode } from '@/types/HttpStatusCode'
import { randomUUID } from 'crypto'
import { rest } from 'msw'

export const handlers = [
    rest.get('/api/users', (req, res, ctx) => {
        return res(
            ctx.status(HttpStatusCode.OK),

            ctx.json([
                {
                    id: '1',
                    email: 'johndoe@gmail.com',
                    password: '123456',
                    createdAt: new Date(),
                    username: 'johndoe',
                    updatedAt: new Date(),
                },
                {
                    id: '2',
                    email: 'arthur@gmail.com',
                    password: '123456',
                    createdAt: new Date(),
                    username: 'arthur',
                    updatedAt: new Date(),
                },
            ]),
        )
    }),
    rest.post('/api/users', async (req, res, ctx) => {
        const { email, password, username, tasks }: CreateUserDto = await req.json()

        return res(
            ctx.status(HttpStatusCode.CREATED),
            ctx.json({
                id: randomUUID(),
                email,
                password,
                username,
                tasks,
            }),
        )
    }),
]
