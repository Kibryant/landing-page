import { prismaMock } from '../../../singleton'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import RepositoryUserPrisma from '../../db/test/RepositoryUserPrisma'

describe('CreateNewUser', () => {
    it('should create a new user', async () => {
        const repository = new RepositoryUserPrisma(prismaMock)
        const createNewUser = new CreateNewUser(repository)

        const user: CreateUserDto = {
            email: 'lionelmessi@gmail.com',
            username: 'lionelmessi',
            password: '123456',
            tasks: [],
        }

        prismaMock.user.create.mockResolvedValue({
            id: '1',
            ...user,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const response = await createNewUser.exec(user)

        expect(response.data?.email).toBe(user.email)
    })
})
