import AddNewTaskToUser from '@/core/user/services/AddNewTaskToUser'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import GetAllTasksByUserId from '@/core/user/services/GetAllTasksByUserId'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('GetAllTasksByUserId', () => {
    it('Must return all tasks by user id', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const createNewUser = new CreateNewUser(repositoryUserMemory)
        const addNewTaskToUser = new AddNewTaskToUser(repositoryUserMemory)
        const getAllTasksByUserId = new GetAllTasksByUserId(repositoryUserMemory)

        const newUser = {
            username: 'any_name',
            email: 'anyemail@gmail.com',
            password: 'any_password',
            tasks: [],
        }

        const { data } = await createNewUser.exec(newUser)

        const task = {
            task: 'any_task',
            authorId: data?._id || '',
            dayToFinishTheTask: new Date(),
            content: 'any_description',
        }

        const task2 = {
            task: 'any_task_2',
            authorId: data?._id || '',
            dayToFinishTheTask: new Date(),
            content: 'any_description_2',
        }

        await addNewTaskToUser.exec([data?._id || '', task])
        await addNewTaskToUser.exec([data?._id || '', task2])

        const { success, error, task: tasks } = await getAllTasksByUserId.exec(data?._id || '')

        expect(success).toBe(true)
        expect(error).toBe(undefined)
        expect(tasks?.length).toBe(2)
        expect(tasks?.[0].task).toBe('any_task')
        expect(tasks?.[1].task).toBe('any_task_2')
        expect(tasks?.[0].content).toBe('any_description')
        expect(tasks?.[1].content).toBe('any_description_2')
    })

    it('Must return null when user id not exists', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const getAllTasksByUserId = new GetAllTasksByUserId(repositoryUserMemory)

        const { success, error, task: tasks } = await getAllTasksByUserId.exec('any_id')

        expect(success).toBe(false)
        expect(error).toBe('User not found')
        expect(tasks).toBe(undefined)
    })
})
