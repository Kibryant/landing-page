import CreateTaskDto from '@/core/tasks/dtos/CreateTaskDto'
import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import AddNewTaskToUser from '@/core/user/services/AddNewTask'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import RepositoryTaskMemory from '@/external/memory/RepositoryTask'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('AddNewTaskToUser', () => {
    it('Must add new task to user', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const repositoryTaskMemory = new RepositoryTaskMemory()
        const createNewUser = new CreateNewUser(repositoryUserMemory)
        const addNewTaskToUser = new AddNewTaskToUser(repositoryUserMemory, repositoryTaskMemory)

        const newUser: CreateUserDto = {
            username: 'any_name',
            email: 'any_email',
            password: 'any_password',
            tasks: [],
        }

        const { data } = await createNewUser.exec(newUser)

        const task: CreateTaskDto = {
            id: 'any_id',
            task: 'any_task',
            dayToFinishTheTask: new Date(),
            description: 'any_description',
            howMuchTimeIsLeft: new Date(),
        }

        const taskData = await addNewTaskToUser.exec({ task, userId: data?.id || '' })
        expect(taskData).toBeTruthy()
    })
})
