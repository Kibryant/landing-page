import UseCases from '@/core/shared/UseCases'
import Task from '../../tasks/model/Task'
import { UserRepository } from '@/core/user/services/repository'

type userId = string

export default class GetAllTasksByUserId implements UseCases<userId, Promise<Task[] | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec(userId: userId): Promise<Task[] | null> {
        const user = await this.userRepository.getUserById(userId)

        if (!user) {
            return null
        }

        const tasks = await this.userRepository.getAllTasksByUserId(userId)

        if (!tasks) {
            return null
        }

        return tasks
    }
}
