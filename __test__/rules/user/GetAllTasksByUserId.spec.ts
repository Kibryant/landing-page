import AddNewTaskToUser from '@/core/user/services/AddNewTask'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import GetAllTasksByUserId from '@/core/user/services/GetAllTasksByUserId'
import RepositoryTaskMemory from '@/external/memory/RepositoryTask'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('GetAllTasksByUserId', () => {
    it('Must return all tasks by user id', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const repositoryTaskMemory = new RepositoryTaskMemory()
        const createNewUser = new CreateNewUser(repositoryUserMemory)
        const addNewTaskToUser = new AddNewTaskToUser(repositoryUserMemory, repositoryTaskMemory)
        const getAllTasksByUserId = new GetAllTasksByUserId(repositoryUserMemory)
        const newUser = {
            username: 'any_name',
            email: 'any_email',
            password: 'any_password',
            tasks: [],
        }

        const { data } = await createNewUser.exec(newUser)
        const task = {
            id: 'any_id',
            task: 'any_task',
            dayToFinishTheTask: new Date(),
            description: 'any_description',
            howMuchTimeIsLeft: new Date(),
        }

        const task2 = {
            id: 'any_id_2',
            task: 'any_task_2',
            dayToFinishTheTask: new Date(),
            description: 'any_description_2',
            howMuchTimeIsLeft: new Date(),
        }

        await addNewTaskToUser.exec({ task, userId: data?.id || '' })
        await addNewTaskToUser.exec({ task: task2, userId: data?.id || '' })
        const tasks = await getAllTasksByUserId.exec(data?.id || '')

        expect(tasks).toEqual([
            { ...task, userId: '1', _id: 'fake id' },
            { ...task2, userId: '1', _id: 'fake id' },
        ])
    })
})
