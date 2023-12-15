import CreateTaskDto from '@/core/task/dtos/CreateTaskDto'
import CreateUserDto from '@/core/user/dtos/CreateUserDto'
import AddNewTaskToUser from '@/core/user/services/AddNewTaskToUser'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('AddNewTaskToUser', () => {
    it('Must add new task to user', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(repositoryUserMemory)
        const addNewTaskToUser = new AddNewTaskToUser(repositoryUserMemory)

        const newUser: CreateUserDto = {
            username: 'any_name',
            email: 'anyemail@gmail.com',
            password: 'any_password',
            tasks: [],
        }

        const { data } = await createNewUser.exec(newUser)

        const task: CreateTaskDto = {
            task: 'any_task',
            authorId: data?._id ?? '',
            dayToFinishTheTask: new Date(),
            content: 'any_description',
        }

        const taskData = await addNewTaskToUser.exec([data?._id ?? '', task])
        expect(taskData).toBeTruthy()
        expect(taskData?.task).toBe(task.task)
        expect(taskData?.authorId).toBe(task.authorId)
        expect(taskData?.content).toBe(task.content)
        expect(taskData?.dayToFinishTheTask).toStrictEqual(task.dayToFinishTheTask)
    })

    it('Must return null when user not exists', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const addNewTaskToUser = new AddNewTaskToUser(repositoryUserMemory)

        const task: CreateTaskDto = {
            task: 'any_task',
            authorId: 'any_author_id',
            dayToFinishTheTask: new Date(),
            content: 'any_description',
        }

        const taskData = await addNewTaskToUser.exec(['any_user_id', task])
        expect(taskData).toBeNull()
    })
})
