import UseCases from '@/core/shared/UseCases'
import Task from '@/core/tasks/model/Task'
import { UserRepository } from './repository'
import { TaskRepository } from '@/core/tasks/services/repository'
import CreateTaskDto from '@/core/tasks/dtos/CreateTaskDto'

interface Input {
    userId: string
    task: CreateTaskDto
}

export default class AddNewTaskToUser implements UseCases<Input, Promise<Task | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository, private taskRepository: TaskRepository) { }
    async exec({ userId, task }: Input): Promise<Task | null> {
        const user = await this.userRepository.getUserById(userId)

        if (!user) {
            return null
        }

        const newTask: Task = await this.taskRepository.createNewTask({
            userId,
            id: task.id,
            task: task.task,
            dayToFinishTheTask: task.dayToFinishTheTask,
            description: task.description,
            howMuchTimeIsLeft: task.howMuchTimeIsLeft,
        })

        user.tasks?.push(newTask)

        return newTask
    }
}
