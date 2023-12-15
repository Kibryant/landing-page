import UseCase from '@/core/shared/UseCase'
import Task from '../../task/entity/Task'
import { UserRepository } from '@/core/user/services/repository'
import TaskOperationResult from '@/types/res/TaskOperation'

type userId = string

export default class GetAllTasksByUserId implements UseCase<userId, Promise<TaskOperationResult<Task[]>>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec(userId: userId): Promise<TaskOperationResult<Task[]>> {
        const { success, error, task } = await this.userRepository.getAllTasksByUserId(userId)

        return {
            success,
            error,
            task,
        }
    }
}
