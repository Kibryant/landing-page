import { CreateNewTask } from '@/core/tasks/services/CreateNewTask'
import AddNewTaskToUser from '@/core/user/services/AddNewTask'
import { CreateNewUser } from '@/core/user/services/CreateNewUser'
import GetTaskByUserId from '@/core/user/services/GetAllTasksByUserId'
import RepositoryTaskMemory from '@/external/memory/RepositoryTask'
import RepositoryUserMemory from '@/external/memory/RepositoryUserMemory'

describe('Get all tasks by userId', () => {
    it('Should return all tasks by userId', async () => {
        const repositoryUserMemory = new RepositoryUserMemory()
        const repositoryTaskMemory = new RepositoryTaskMemory()
        const getTaskByUserId = new GetTaskByUserId(repositoryUserMemory)
        const createNewUser = new CreateNewUser(repositoryUserMemory)
        const createNewTask = new CreateNewTask(repositoryTaskMemory)
        const addNewTaskToUser = new AddNewTaskToUser(repositoryUserMemory, repositoryTaskMemory)

        const newTask1 = await createNewTask.exec({
            id: '1',
            task: 'Task 1',
            description: 'Description 1',
            dayToFinishTheTask: new Date(),
            howMuchTimeIsLeft: new Date(),
        })

        const { data } = await createNewUser.exec({
            email: 'arthur',
            username: 'test',
            password: '<PASSWORD>',
        })

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const addedTaskToUser = await addNewTaskToUser.exec({ userId: data?.id ?? '', task: newTask1! })

        const catchTaskByUserId = await getTaskByUserId.exec(data?.id ?? '')

        expect(catchTaskByUserId).toStrictEqual([{ ...newTask1, userId: data?.id }])
        expect({ ...addedTaskToUser, _id: 'fake id' }).toEqual({ ...newTask1, userId: data?.id })
    })
})
