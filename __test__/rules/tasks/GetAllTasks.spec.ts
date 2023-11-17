import { CreateNewTask } from '@/core/tasks/services/CreateNewTask'
import { GetAllTasks } from '@/core/tasks/services/GetAllTasks'
import RepositoryTaskMemory from '@/external/memory/RepositoryTask'

const repositoryTaskMemory = new RepositoryTaskMemory()
const getAllTasks = new GetAllTasks(repositoryTaskMemory)
const createNewTask = new CreateNewTask(repositoryTaskMemory)

describe('Get All Tasks', () => {
    it('should return a list of tasks empty', async () => {
        const tasks = await getAllTasks.exec()

        expect(tasks).toBeDefined()
        expect(tasks?.length).toEqual(0)
    })

    it('should return one task created', async () => {
        return createNewTask
            .exec({
                id: '1',
                task: 'task 1',
                description: 'description 1',
                dayToFinishTheTask: new Date(),
                howMuchTimeIsLeft: new Date(),
            })
            .then(() => {
                return getAllTasks.exec().then((tasks) => {
                    expect(tasks).toBeDefined()
                    expect(tasks?.length).toEqual(1)
                })
            })
    })

    it('should return all tasks created', async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const newTask = await createNewTask.exec({
            id: '1',
            task: 'task 1',
            description: 'description 1',
            dayToFinishTheTask: new Date(),
            howMuchTimeIsLeft: new Date(),
        })

        const tasks = await getAllTasks.exec()

        expect(tasks).toBeDefined()
        expect(tasks?.length).toEqual(2)
    })
})
