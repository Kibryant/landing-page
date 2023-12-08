import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import RepositoryUserPrismaTest from '../../../src/external/database/repository/test/RepositoryUserPrismaTest'
import { prismaMock as prisma } from '../../../singletonTest'
import CreateUserDto from '@/core/user/dtos/CreateUserDto'

beforeAll(async () => {
    const userMock = [
        {
            id: '1',
            email: '1@gmail.com',
            username: '1',
            password: '1',
            tasks: {
                create: [
                    {
                        task: 'Task 1',
                        dayToFinishTheTask: new Date(),
                        description: 'Description 1',
                        howMuchTimeIsLeft: new Date(),
                    },
                ],
            },
        },
        {
            id: '2',
            email: '2@gmail.com',
            username: '2',
            password: '2',
            tasks: {
                create: [
                    {
                        task: 'Task 2',
                        dayToFinishTheTask: new Date(),
                        description: 'Description 2',
                        howMuchTimeIsLeft: new Date(),
                    },
                ],
            },
        },
    ]

    await prisma.user.createMany({
        data: userMock,
    })
})

afterAll(async () => {
    const deleteUsers = prisma.user.deleteMany()

    await prisma.$transaction([deleteUsers])

    await prisma.$disconnect()
})

describe('CreateNewUser', () => {
    it('should create a new user', async () => {
        const user: CreateUserDto = {
            email: 'arthurgus@gmail.com',
            username: 'arthurgus',
            password: '123456',
        }

        prisma.user.create.mockResolvedValue({
            ...user,
            id: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const repositoryUserPrisma = new RepositoryUserPrismaTest(prisma)
        const createNewUser = new CreateNewUser(repositoryUserPrisma)

        const response = await createNewUser.exec(user)
        expect(response.data).toHaveProperty('id')
    })
})
