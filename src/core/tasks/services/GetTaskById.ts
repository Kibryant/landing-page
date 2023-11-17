import UseCases from '@/core/shared/UseCases'
import Task from '../model/Task'
import { TaskRepository } from './repository'

type taskId = string

export default class GetTaskById implements UseCases<taskId, Task | null> {
    // eslint-disable-next-line prettier/prettier
    constructor(private taskRepository: TaskRepository) { }
    async exec(id: taskId): Promise<Task | null> {
        const task = await this.taskRepository.getTaskById(id)

        if (!task) {
            return null
        }

        return task
    }
}
