import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import { GetAllUsers } from '@/core/user/services/GetAllUsers'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('GetAllUsers', () => {
    it('should return all users', async () => {
        const userRepository = new RepositoryUserMemory()
        const getAllUsers = new GetAllUsers(userRepository)
        const createNewUser = new CreateNewUser(userRepository)

        await createNewUser.exec({
            username: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
            tasks: [
                {
                    id: '1',
                    task: 'Create a new project',
                    description: 'Create a new project using NodeJS and TypeScript',
                    howMuchTimeIsLeft: new Date(),
                    dayToFinishTheTask: new Date(),
                },
            ],
        })

        const users = await getAllUsers.exec()
        expect(users).toBeDefined()
        expect(users?.length).toBe(1)
    })
})
