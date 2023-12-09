import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import { UpdateUser } from '@/core/user/services/UpdateUser'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('UpdateUser', () => {
    it('should return user updated', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(repositoryUserMemory)
        const updateUser = new UpdateUser(repositoryUserMemory)

        const { data } = await createNewUser.exec({
            username: 'any_user',
            email: 'anyemail@gmail.com',
            password: 'any_password',
        })

        const user = await updateUser.exec([
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            data!._id!,
            { email: 'anyemail@gmail.com_updated', username: 'any_user_updated', password: 'any_password_updated' },
        ])

        expect(user?.data?.email).toBe('anyemail@gmail.com_updated')
        expect(user?.data?.username).toBe('any_user_updated')
        expect(user?.data?.password).toBe('any_password_updated')
    })

    it('should return user not found', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const updateUser = new UpdateUser(repositoryUserMemory)

        const user = await updateUser.exec([
            'any-id',
            { email: 'anyemail@gmail.com_updated', username: 'any_user_updated', password: 'any_password_updated' },
        ])

        expect(user?.data).toBe(null)
        expect(user?.message).toBe('User not exits')
    })

    it('should return id not provide', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const updateUser = new UpdateUser(repositoryUserMemory)

        const user = await updateUser.exec([
            null as unknown as string,
            { email: 'anyemail@gmail.com_updated', username: 'any_user_updated', password: 'any_password_updated' },
        ])

        expect(user?.data).toBe(null)
        expect(user?.message).toBe('Id not provide!')
    })
})
