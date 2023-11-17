import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import { UpdateUser } from '@/core/user/services/UpdateUser'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('UpdateUser', () => {
    test('should return user updated', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(repositoryUserMemory)
        const updateUser = new UpdateUser(repositoryUserMemory)

        const { data } = await createNewUser.exec({
            username: 'any_user',
            email: 'any_email',
            password: 'any_password',
        })

        const user = await updateUser.exec({
            id: data?.id ?? '',
            email: 'any_email_updated',
            username: 'any_user_updated',
            password: 'any_password_updated',
        })

        expect(user?.data?.email).toBe('any_email_updated')
        expect(user?.data?.username).toBe('any_user_updated')
        expect(user?.data?.password).toBe('any_password_updated')
    })

    test('should return user not found', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const updateUser = new UpdateUser(repositoryUserMemory)

        const user = await updateUser.exec({
            id: 'any_id',
            email: 'any_email_updated',
            username: 'any_user_updated',
            password: 'any_password_updated',
        })

        expect(user?.data).toBe(null)
        expect(user?.message).toBe('User not exits')
    })

    test('should return id not provide', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const updateUser = new UpdateUser(repositoryUserMemory)

        const user = await updateUser.exec({
            id: '',
            email: 'any_email_updated',
            username: 'any_user_updated',
            password: 'any_password_updated',
        })

        expect(user?.data).toBe(null)
        expect(user?.message).toBe('Id not provide!')
    })
})
