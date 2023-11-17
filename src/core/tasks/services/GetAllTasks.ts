import UseCases from '@/core/shared/UseCases'
import Task from '../model/Task'
import { TaskRepository } from './repository'

export class GetAllTasks implements UseCases<void, Promise<Task[] | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private taskRepository: TaskRepository) { }
    async exec(): Promise<Task[] | null> {
        const tasks = await this.taskRepository.getAllTasks()

        if (!tasks) {
            return null
        }

        return tasks
    }
}
