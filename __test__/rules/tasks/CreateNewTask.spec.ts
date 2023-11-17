import CreateTaskDto from '@/core/tasks/dtos/CreateTaskDto'
import { CreateNewTask } from '@/core/tasks/services/CreateNewTask'
import RepositoryTaskMemory from '@/external/memory/RepositoryTask'

describe('CreateNewTask', () => {
    it('Must created new tasks', async () => {
        const repositoryTaskMemory = new RepositoryTaskMemory()
        const createNewTask = new CreateNewTask(repositoryTaskMemory)

        const taskToCreate: CreateTaskDto = {
            id: '1',
            task: 'make coffe',
            description: 'make coffe task description',
            dayToFinishTheTask: new Date(),
            howMuchTimeIsLeft: new Date(),
        }

        const createdTask = await createNewTask.exec(taskToCreate)

        expect(createdTask).toBeDefined()
    })
})
