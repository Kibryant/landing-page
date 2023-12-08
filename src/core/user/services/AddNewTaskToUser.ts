import UseCase from '@/core/shared/UseCase'
import Task from '@/core/task/entity/Task'
import { UserRepository } from './repository'
import CreateTaskDto from '@/core/task/dtos/CreateTaskDto'

type Input = [string, CreateTaskDto]

export default class AddNewTaskToUser implements UseCase<Input, Promise<Task | null>> {
    // eslint-disable-next-line prettier/prettier
    constructor(private userRepository: UserRepository) { }
    async exec([userId, task]: Input): Promise<Task | null> {
        const newTask = await this.userRepository.addNewTaskToUser(userId, task)

        if (!newTask) {
            return null
        }

        return newTask
    }
}
