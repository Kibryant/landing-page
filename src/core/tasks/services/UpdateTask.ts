import UseCases from '@/core/shared/UseCases'
import UpdateTaskDto from '../dtos/UpdateTaskDto'
import { TaskRepository } from './repository'
import Task from '../model/Task'

export default class UpdateTask implements UseCases<UpdateTaskDto, Promise<Task | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private taskRepository: TaskRepository) { }
    async exec({ id, task, description, dayToFinishTheTask }: UpdateTaskDto): Promise<Task | null> {
        if (id.length === 0) {
            return null
        }

        const dto: UpdateTaskDto = {
            id,
        }

        if (task) {
            dto.task = task
        }

        if (description) {
            dto.description = description
        }

        if (dayToFinishTheTask) {
            dto.dayToFinishTheTask = dayToFinishTheTask
        }

        const updatedTask = await this.taskRepository.updateTask(id, dto)

        if (!updatedTask) {
            return null
        }

        return updatedTask
    }
}
