import { GetUserByEmail } from '@/core/user/services/GetUserByEmail'
import { prismaMock } from '../../../singleton'
import RepositoryUserPrisma from '../../db/test/RepositoryUserPrisma'

describe('GetUserByEmail', () => {
    it('should return a user by email', async () => {
        const repository = new RepositoryUserPrisma(prismaMock)
        const getUserByEmail = new GetUserByEmail(repository)

        const user = {
            id: 'some-id',
            email: 'arthur@gmail.com',
            username: 'arthur',
            password: '123456',
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        prismaMock.user.findUnique.mockResolvedValue(user)

        expect(await getUserByEmail.exec(user.email).then(({ data }) => data)).toMatchObject(user)
    })
})
