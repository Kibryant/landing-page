import UseCase from '@/core/shared/UseCase'
import Task from '../../task/entity/Task'
import { UserRepository } from '@/core/user/services/repository'

type userId = string

export default class GetAllTasksByUserId implements UseCase<userId, Promise<Task[] | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec(userId: userId): Promise<Task[] | null> {
        const tasks = await this.userRepository.getAllTasksByUserId(userId)

        if (!tasks) {
            return null
        }

        return tasks
    }
}
