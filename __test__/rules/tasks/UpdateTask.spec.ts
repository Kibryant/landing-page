import { CreateNewTask } from '@/core/tasks/services/CreateNewTask'
import UpdateTask from '@/core/tasks/services/UpdateTask'
import RepositoryTaskMemory from '@/external/memory/RepositoryTask'

describe('UdpateTasks', () => {
    it('should update a task', async () => {
        const taskRepository = new RepositoryTaskMemory()
        const createNewTask = new CreateNewTask(taskRepository)
        const updateTask = new UpdateTask(taskRepository)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createdTask = await createNewTask.exec({
            id: '1',
            task: 'test',
            description: 'test',
            dayToFinishTheTask: new Date(),
        })

        const task = await updateTask.exec({
            id: '1',
            task: 'test update',
            description: 'test update',
            dayToFinishTheTask: new Date(),
            howMuchTimeIsLeft: new Date(),
        })

        expect(task?.task).toBe('test update')
    })

    it('should not update a task', async () => {
        const taskRepository = new RepositoryTaskMemory()
        const updateTask = new UpdateTask(taskRepository)

        const task = await updateTask.exec({
            id: 'id with not exists',
            task: 'test',
            description: 'test',
            dayToFinishTheTask: new Date(),
            howMuchTimeIsLeft: new Date(),
        })

        expect(task).toBeNull()
    })
})
