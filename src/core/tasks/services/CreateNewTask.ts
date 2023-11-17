import UseCases from '@/core/shared/UseCases'
import CreateTaskDto from '../dtos/CreateTaskDto'
import Task from '../model/Task'
import { TaskRepository } from './repository'

export class CreateNewTask implements UseCases<CreateTaskDto, Task | null> {
    // eslint-disable-next-line prettier/prettier
    constructor(private taskRepository: TaskRepository) { }

    async exec({ id, task, description, dayToFinishTheTask }: CreateTaskDto): Promise<Task | null> {
        const taskExists = await this.taskRepository.getTaskById(id)

        if (taskExists) {
            return null
        }

        const newTask: Task = await this.taskRepository.createNewTask({
            id,
            task,
            description,
            dayToFinishTheTask,
            howMuchTimeIsLeft: dayToFinishTheTask,
        })

        return newTask
    }
}
