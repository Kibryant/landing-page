import UseCase from '@/core/shared/UseCase'
import Task from '@/core/task/entity/Task'
import { UserRepository } from './repository'
import CreateTaskDto from '@/core/task/dtos/CreateTaskDto'
import TaskOperationResult from '@/types/res/TaskOperation'

type Input = [string, CreateTaskDto]

export default class AddNewTaskToUser implements UseCase<Input, Promise<TaskOperationResult<Task>>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec([userId, taskToCreate]: Input): Promise<TaskOperationResult<Task>> {
        const { success, error, task } = await this.userRepository.addNewTaskToUser(userId, taskToCreate)

        return {
            success,
            error,
            task,
        }
    }
}
